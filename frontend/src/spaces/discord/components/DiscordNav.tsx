// import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './DiscordNav.module.css';
// import { discordApi } from '../../../utils/api/discord';
// import type { DiscordUserProfile } from '../types';
// import { AUTH_STATE_CHANGED_EVENT } from '../../../utils/auth/events';
import { useUser } from '../context/UserContext';

const DiscordNav = () => {
  const { user, loading } = useUser();

  // Determine whether a navigation link should be highlighted as active.
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Common navigation items that are always visible to the user.
  const discordNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Guilds', path: '/guilds' },
    { name: 'Events', path: '/guilds/552953312073220096/events' },
  ];

  const avatarUrl = user?.avatarHash
    ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatarHash}.${user.avatarHash.startsWith('a_') ? 'gif' : 'png'}?size=64`
    : null;

  const profileInitial = user?.globalName?.charAt(0).toUpperCase() ?? 'U';

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.backLink}>← SSyncSpace</Link>
      <div className={styles.navGroup}>
        <h2 className={styles.spaceTitle}>Discord Space</h2>
        <div className={styles.navActions}>
          <div className={styles.navLinks}>
            {discordNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navLink} ${isActive(item.path) ? styles.active : ''}`}
              >
                {item.name}
              </Link>
            ))}
            {!loading && !user && (
              <Link
                to="/login"
                className={`${styles.navLink} ${isActive('/login') ? styles.active : ''}`}
              >
                Login
              </Link>
            )}
          </div>

          {!loading && user && (
            <Link
              to="/profile"
              className={`${styles.profileLink} ${isActive('/profile') ? styles.profileActive : ''}`}
              aria-label="View profile"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="Discord avatar" className={styles.profileAvatar} />
              ) : (
                <span className={styles.profileFallback}>{profileInitial}</span>
              )}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DiscordNav;