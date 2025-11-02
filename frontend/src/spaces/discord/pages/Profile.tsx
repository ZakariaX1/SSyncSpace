import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { discordApi } from '../../../utils/api/discord';
import type { DiscordUserProfile } from '../types';
import { AUTH_STATE_CHANGED_EVENT } from '../../../utils/auth/events';

function Profile() {
  // Track loading / error state to give users feedback while we fetch data.
  const [profile, setProfile] = useState<DiscordUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const fetchProfile = async () => {
      try {
        const result = await discordApi.getProfile();
        if (!cancelled) {
          setProfile(result ?? null);
        }
      } catch (err) {
        if (!cancelled) {
          if (err instanceof Error && err.message.includes('401')) {
            // Most likely a 401 (not logged in). Send the user to the login page.
            setError('You need to log in to view your profile.');
            navigate('/discord/login');
          } else {
            setError('Failed to load your profile. Please try again later.');
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
    await discordApi.logout();
    // Let the rest of the app know auth state changed so nav/user data refresh.
    window.dispatchEvent(new Event(AUTH_STATE_CHANGED_EVENT));
      navigate('/discord/login');
    } catch (err) {
      setError('Failed to log out. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Profile not found.</p>;
  }

  const avatarUrl = profile.avatarHash
    ? `https://cdn.discordapp.com/avatars/${profile.discordId}/${profile.avatarHash}.${profile.avatarHash.startsWith('a_') ? 'gif' : 'png'}?size=128`
    : null;

  return (
    <section>
      <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Discord avatar"
            style={{ width: '96px', height: '96px', borderRadius: '50%' }}
          />
        ) : (
          <div
            style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-space-discord), #7289da)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2rem',
              fontWeight: 600,
            }}
          >
            {profile.globalName?.charAt(0).toUpperCase() ?? 'U'}
          </div>
        )}
        <div>
          <h3 style={{ margin: 0 }}>{profile.globalName ?? 'Discord User'}</h3>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>ID: {profile.discordId}</p>
        </div>
      </header>

      <dl style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '0.5rem 1rem', marginBottom: '2rem' }}>
        <dt>Account created</dt>
        <dd>{new Date(profile.accountCreated).toLocaleString()}</dd>
        <dt>Linked at</dt>
        <dd>{new Date(profile.createdAt).toLocaleString()}</dd>
        <dt>Last updated</dt>
        <dd>{new Date(profile.updatedAt).toLocaleString()}</dd>
      </dl>

      <button
        type="button"
        onClick={handleLogout}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--color-space-discord)',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
        }}
      >
        Log out
      </button>
    </section>
  );
}

export default Profile;
