import crypto from 'crypto'

type TokenResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
};

export async function exchangeCode(code: string): Promise<TokenResponse> {
    const response = await fetch(`${process.env.DISCORD_API_ENDPOINT}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID as string,
            client_secret: process.env.DISCORD_CLIENT_SECRET as string,
            grant_type: 'authorization_code',
            code,
            redirect_uri: process.env.DISCORD_REDIRECT_URI as string,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text().catch(() => '');
        console.error('Discord token exchange failed:', response.status, response.statusText, errorBody);
        throw new Error('Failed to exchange code for tokens');
    }

    return response.json() as Promise<TokenResponse>;
}

export async function refreshAccessToken(refresh_token: string): Promise<TokenResponse> {
    const response = await fetch(`${process.env.DISCORD_API_ENDPOINT}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID as string,
            client_secret: process.env.DISCORD_CLIENT_SECRET as string,
            grant_type: 'refresh_token',
            refresh_token,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text().catch(() => '');
        console.error('Discord token refresh failed:', response.status, response.statusText, errorBody);
        throw new Error('Failed to refresh access token');
    }

    return response.json() as Promise<TokenResponse>;
}

export async function revokeAccessToken(token: string): Promise<void> {
    // Implementation to revoke access token
    await fetch(`${process.env.DISCORD_API_ENDPOINT}/oauth2/token/revoke`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID as string,
            client_secret: process.env.DISCORD_CLIENT_SECRET as string,
            token,
        }),
    });
}

// export function getDiscordUserData(access_token: string): Promise
    // fetch userId, globalName and the icon

const algorithm = 'aes-256-gcm';
const key = Buffer.from(process.env.TOKEN_ENCRYPTION_KEY as string, 'hex');

export function encryptToken(token: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    
    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    
    return iv.toString('hex') + ':' + encrypted + ':' + authTag;
}

export function decryptToken(encryptedToken: string): string {
    const [ ivHex, encryptedHex, authTagHex ] = encryptedToken.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
