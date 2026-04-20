import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { discordApi } from '../../../utils/api/discord';
import { AUTH_STATE_CHANGED_EVENT } from '../../../utils/auth/events';
import { useUser } from '../context/UserContext';

function Profile() {
  const { user, loading, logout } = useUser();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await discordApi.logout();
      logout();
      // Let the rest of the app know auth state changed so nav/user data refresh.
      window.dispatchEvent(new Event(AUTH_STATE_CHANGED_EVENT));
      navigate('/login');
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

  if (!user) {
    return <p>Profile not found.</p>;
  }

  const avatarUrl = user.avatarHash
    ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatarHash}.${user.avatarHash.startsWith('a_') ? 'gif' : 'png'}?size=128`
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
            {user.globalName?.charAt(0).toUpperCase() ?? 'U'}
          </div>
        )}
        <div>
          <h3 style={{ margin: 0 }}>{user.globalName ?? 'Discord User'}</h3>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>ID: {user.discordId}</p>
        </div>
      </header>

      <dl style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '0.5rem 1rem', marginBottom: '2rem' }}>
        <dt>Account created</dt>
        <dd>{new Date(user.accountCreated).toLocaleString()}</dd>
        <dt>Linked at</dt>
        <dd>{new Date(user.createdAt).toLocaleString()}</dd>
        <dt>Last updated</dt>
        <dd>{new Date(user.updatedAt).toLocaleString()}</dd>
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
