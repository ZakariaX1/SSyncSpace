import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { discordApi } from '../../../utils/api/discord';
import { AUTH_STATE_CHANGED_EVENT } from '../../../utils/auth/events';
import { useUser } from '../context/UserContext';

const OAUTH_STATE_KEY = 'ssyncspace_discord_oauth_state';

function OAUTH2Callback() {
  // Keep track of what we are doing so the user sees progress updates.
  const [status, setStatus] = useState('Hang tight while we get things ready for you...');
  const navigate = useNavigate();
  const { login } = useUser();

  useEffect(() => {
    // Discord sends us back with auth parameters after the user authorizes.
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const returnedState = params.get('state');
    const expectedState = sessionStorage.getItem(OAUTH_STATE_KEY);

    console.log("got: " + returnedState);
    console.log("expected: " + expectedState);

    // Clear state once we read it so it cannot be replayed later.
    sessionStorage.removeItem(OAUTH_STATE_KEY);

    if (!returnedState || !expectedState || returnedState !== expectedState) {
      setStatus('Invalid login state. Please restart the login process.');
      return;
    }

    // When there is no code we cannot continue, so let the user know immediately.
    if (!code) {
      setStatus('Authorization code missing. Please restart the login process.');
      return;
    }

    let cancelled = false; // Guards against state updates after unmounting.

    (async () => {
      try {
        setStatus('Checking your Discord account...');
        // Ask our backend to exchange the code for tokens and set secure cookies.
        const { user } = await discordApi.login(code);
        // Notify the rest of the app that authentication state changed so the
        // navigation bar (and any other listeners) can refresh user data.
        window.dispatchEvent(new Event(AUTH_STATE_CHANGED_EVENT));
        if (cancelled) {
          return;
        }

        setStatus('All set! Redirecting you now...');
        login(user ?? null)
        // Give the user a short moment to read the success message before redirecting.
        setTimeout(() => {
          if (!cancelled) {
            navigate('/');
          }
        }, 1000);
      } catch (error) {
        console.error('Discord login failed:', error);
        if (!cancelled) {
          setStatus('Something went wrong. Please try signing in again.');
        }
      }
    })();

    // Clean up in case the component unmounts while the request is in flight.
    return () => {
      cancelled = true;
    };
  }, [login, navigate]);

  return (
    <div>
      <p>{status}</p>
    </div>
  );
}

export default OAUTH2Callback;