import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { discordApi } from '../../../utils/api/discord';
import { AUTH_STATE_CHANGED_EVENT } from '../../../utils/auth/events';

function OAUTH2Callback() {
  // Keep track of what we are doing so the user sees progress updates.
  const [status, setStatus] = useState('Hang tight while we get things ready for you...');
  const navigate = useNavigate();

  // Discord sends us back with a "code" query param after the user authorises.
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  useEffect(() => {
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
        await discordApi.login(code);
        // Notify the rest of the app that authentication state changed so the
        // navigation bar (and any other listeners) can refresh user data.
  window.dispatchEvent(new Event(AUTH_STATE_CHANGED_EVENT));
        if (cancelled) {
          return;
        }

        setStatus('All set! Redirecting you now...');
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
  }, [code, navigate]);

  return (
    <div>
      <p>{status}</p>
    </div>
  );
}

export default OAUTH2Callback;