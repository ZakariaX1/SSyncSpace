import { useMemo } from 'react';

const OAUTH_STATE_KEY = 'ssyncspace_discord_oauth_state';

function generateOAuthState(): string {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    const binary = String.fromCharCode(...bytes);

    // Use base64url so the value is URL-safe without extra escaping.
    return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/g, '');
}

function Login() {
    const scope = encodeURIComponent('identify guilds');
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
    const redirectUri = encodeURIComponent(import.meta.env.VITE_DISCORD_REDIRECT_URI);
    const responseType = 'code';
    const discordOauth2Url = import.meta.env.VITE_DISCORD_OAUTH2_URL;

    const oauthState = useMemo(() => {
        const state = generateOAuthState();
        sessionStorage.setItem(OAUTH_STATE_KEY, state);
        console.log("Made State")
        return state;
    }, []);
    
    const oauth2Url = `${discordOauth2Url}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&prompt=none&state=${oauthState}`;
    return (
        <div>
            <h2>Discord Login</h2>
            <p>In order to start using our service as more than just a guest, you need to log in</p>
            <p>When you click the button below, you'll be redirected to discord's own OAUTH2 page 
                where you will be asked to link to our discord application (SSynSpace).</p>
            <p>Once authorized we will save your discord ID, username and profile picture path in our database.</p>
            <p>We will also use the authorized code to use the discord API on your behalf, where we are only 
                allowed to make use of the authorized scopes (profile and joined guilds) and to
                save the user from needing to log in each time they would want to make a request
                we save the Tokens neccesairy for these requests in our database as well.</p>
            <p>These tokens are revoked when you hit log out.</p>

            <a
                href={`${oauth2Url}`}
                style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'var(--color-space-discord)',
                    color: 'white',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    marginTop: '1rem'
                }}
            >
                Log in with Discord
            </a>
        </div>
    );
}

export default Login;