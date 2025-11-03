import { Router } from 'express';
import { prisma } from '../../database/prisma';
import { ResponseStatus, ERROR_MESSAGES } from '../../utils/response.types';
import { authenticateJWT } from '../../middleware/authMiddleware';
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from '../../types/requests';
import { exchangeCode, refreshAccessToken, encryptToken, decryptToken } from './helpers/OAUTH2';

const router = Router();

const SNOWFLAKE_REGEX = /^\d{17,19}$/;

// ===================================
// General info
// ===================================

router.get('/info', (req, res) => {
  res.json({
    space: 'discord',
    message: 'Discord space API is working!',
    availableEndpoints: ['/info', '/events']
  });
});

// ===================================
// User related
// ===================================

// On the frontend a user will login using using discord's OAUTH2, then the one time code is sent here to
//  send to discord's OAUTH2 API endpoint to retrieve THEIR access and refresh tokens to get their profile data and guilds.
// (Reference: https://discord.com/developers/docs/topics/oauth2#oauth2)
// Then we see if the profile exists in our DB, if not we create it, else we update it. And we store their discord tokens
//  securely for future user updates like changed username, avatar, etc.
// Lastly we generate our own JWT token for our app's authentication and send it back to the frontend.
router.post('/auth/login', async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(ResponseStatus.BAD_REQUEST).json({
      error: ERROR_MESSAGES.CODE_MISSING
    });
  }
  
  try {
    const tokenData = await exchangeCode(code);
    const access_token = tokenData.access_token;
    const refresh_token = tokenData.refresh_token;
    
    // Fetch user data from Discord
    // (Referencing: https://discord.com/developers/docs/resources/user#user-object)
    const discordUserResponse = await fetch(`${process.env.DISCORD_API_ENDPOINT}/users/@me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    
    if (!discordUserResponse.ok) {
      throw new Error('Failed to fetch Discord user data');
    }

    const discordUserData = await discordUserResponse.json();
    
    // Upsert user in our database

    // Decode Discord snowflake to account creation date
    // Convert the id (string to BigInt), get the discordEpoch (fixed creation time), and skipping the first 22 parts of the snowflake
    const discordSnowflake = BigInt(discordUserData.id);
    const discordEpoch = 1420070400000n;
    const accountCreated = new Date(Number((discordSnowflake >> 22n) + discordEpoch));

    const user = await prisma.discordUsers.upsert({
      where: { discordId: discordUserData.id },
      update: {
      globalName: discordUserData.global_name,
      avatarHash: discordUserData.avatar,
      accessToken: encryptToken(access_token),
      refreshToken: encryptToken(refresh_token),
      },
      create: {
      discordId: discordUserData.id,
      globalName: discordUserData.global_name,
      avatarHash: discordUserData.avatar,
      accountCreated: accountCreated,
      accessToken: encryptToken(access_token),
      refreshToken: encryptToken(refresh_token),
      }
    });

    const payload = {
      discordId: user.discordId,
    };

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '24h', // Token valid for one days
    })
    const jwtRefreshToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '7d', // Token valid for 7 days
    })

    // Return the cookies to the client
    res.cookie('ssyncspace_auth_token', jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.cookie('ssyncspace_auth_refresh', jwtRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Also supply the user data in the response body for convenience
    return res.json({
      message: 'Login successful',
      user: {
        discordId: user.discordId,
        globalName: user.globalName,
        avatarHash: user.avatarHash,
        accountCreated: user.accountCreated,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({
      error: ERROR_MESSAGES.LOGIN_FAILED
    });
  }    
});

// Refresh our own JWT token (also discord's OAUTH2 token for synchronized token expiration)
router.post('/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(ResponseStatus.BAD_REQUEST).json({
      error: ERROR_MESSAGES.FORBIDDEN
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as { discordId: string };
    if (!decoded || !decoded.discordId) {
      return res.status(ResponseStatus.UNAUTHORIZED).json({
        error: ERROR_MESSAGES.UNAUTHORIZED
      });
    }

    const user = await prisma.discordUsers.findUnique({
      where: { discordId: decoded.discordId },
      select: { refreshToken: true }
    });
    
    if (!user) {
      return res.status(ResponseStatus.NOT_FOUND).json({
        error: ERROR_MESSAGES.DISCORD_USER_NOT_FOUND
      });
    }

    if (!user.refreshToken) {
      return res.status(ResponseStatus.FORBIDDEN).json({
        error: ERROR_MESSAGES.FORBIDDEN
      });
    }

    // Decrypt stored refresh token
    const decryptedRefreshToken = decryptToken(user.refreshToken);
    const tokenData = await refreshAccessToken(decryptedRefreshToken);

    const discordUserResponse = await fetch(`${process.env.DISCORD_API_ENDPOINT}/users/@me`, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });
    
    if (!discordUserResponse.ok) {
      throw new Error('Failed to fetch Discord user data');
    }

    const discordUserData = await discordUserResponse.json();
    
    // Update stored tokens
    await prisma.discordUsers.update({
      where: { discordId: decoded.discordId },
      data: {
        // In case of a new profile or name
        globalName: discordUserData.global_name,
        avatarHash: discordUserData.avatar,
        // New tokens
        accessToken: encryptToken(tokenData.access_token),
        refreshToken: encryptToken(tokenData.refresh_token),
      }
    });
    
    // Generate new Token pair
    const newToken = jwt.sign({ discordId: decoded.discordId }, process.env.JWT_SECRET!, {
      expiresIn: '24h',
    });
    const newRefreshToken = jwt.sign({ discordId: decoded.discordId }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    // TODO: Add a table with invalidated but not yet expired to prevent reuse until expiration if need be?
    
    res.cookie('ssyncspace_auth_token', newToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.cookie('ssyncspace_auth_refresh', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    return res.json({
      message: 'Token refreshed successfully',
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    return res.status(ResponseStatus.UNAUTHORIZED).json({
      error: ERROR_MESSAGES.UNAUTHORIZED
    });
  }
});

router.post('/auth/logout', authenticateJWT, async (req: AuthenticatedRequest, res) => {
  const requestingUser = req.user;
  try {
    // For logout we can simply clear the cookies on the client side and remove
    //  the discord tokens from our DB for security reasons.
    res.clearCookie('ssyncspace_auth_token');
    res.clearCookie('ssyncspace_auth_refresh');
    await prisma.discordUsers.updateMany({
      where: { discordId: requestingUser?.discordId },
      data: {
        accessToken: null,
        refreshToken: null,
      }
    });
    
    return res.json({
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Logout failed, please try again later'
    });
  }
});
  

// PRIVATE Get full profile
router.get('/users/profile', authenticateJWT, async (req: AuthenticatedRequest, res) => {
  const requestingUser = req.user;

  try {
    const user = await prisma.discordUsers.findUnique({
      where: { discordId: requestingUser?.discordId },
      select: {
        discordId: true,
        globalName: true,
        avatarHash: true,
        accountCreated: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    
    if (!user) {
      return res.status(ResponseStatus.NOT_FOUND).json({
        error: ERROR_MESSAGES.DISCORD_USER_NOT_FOUND
      });
    }

    res.json(user);
  } catch (error) {
    res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({
      error: ERROR_MESSAGES.COULD_NOT_FETCH_DISCORD_USER_DATA
    });
  }

});

// Public get user info by discordId for getting profile when selecting cohost for example
router.get('/users/:discordId', async (req, res) => {
  const { discordId } = req.params;

  if (!SNOWFLAKE_REGEX.test(discordId)) {
    return res.status(ResponseStatus.BAD_REQUEST).json({
      error: ERROR_MESSAGES.INVALID_DISCORD_ID
    });
  }

  try {
    const user = await prisma.discordUsers.findUnique({
      where: { discordId }, // This is the primary key anyway
      select: {
        discordId: true,
        globalName: true,
        avatarHash: true,
        accountCreated: true,
      }
    });

    if (!user) {
      return res.status(ResponseStatus.NOT_FOUND).json({
        error: ERROR_MESSAGES.DISCORD_USER_NOT_FOUND
      });
    }
    
    res.json(user);
  } catch (error) {
    res.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({
      error: ERROR_MESSAGES.COULD_NOT_FETCH_DISCORD_USER_DATA
    });
  }

});

// ===================================
// Guilds
// ===================================

// Get all guilds
router.get('/guilds', async (req, res) => {
  try {
    const guilds = await prisma.discordGuilds.findMany();
    res.json(guilds);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch guilds' });
  }
});

// Get guild by ID, only public info if not a member
router.get('/guilds/:guildId', async (req, res) => {
  const { guildId } = req.params;
  
  try {
    const guild = await prisma.discordGuilds.findUnique({
      where: { guildId }
    });
    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
    }
    res.json(guild);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch guild' });
  }
});

// =================================
// Guild -> Events
// =================================

// Get all events for a guild
router.get('/guilds/:guildId/events', async (req, res) => {
  try {
    const events = await prisma.discordEvents.findMany({
      where: { guildId: req.params.guildId }
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

export default router;