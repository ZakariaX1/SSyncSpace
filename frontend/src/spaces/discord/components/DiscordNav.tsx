import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './DiscordNav.module.css';
import { discordApi } from '../../../utils/api/discord';
import type { DiscordUserProfile } from '../types';
import { AUTH_STATE_CHANGED_EVENT } from '../../../utils/auth/events';

const DiscordNav = () => {
  const location = useLocation();
  const [profile, setProfile] = useState<DiscordUserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const isMountedRef = useRef(true);

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

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadProfile = useCallback(async () => {
    if (isMountedRef.current) {
      setLoadingProfile(true);
    }
    try {
      const result = await discordApi.getProfile();
      if (isMountedRef.current) {
        setProfile(result ?? null);
      }
    } catch (error) {
      if (isMountedRef.current) {
        setProfile(null);
      }
    } finally {
      if (isMountedRef.current) {
        setLoadingProfile(false);
      }
    }
  }, []);

  useEffect(() => {
    // Load the profile once on mount.
    loadProfile();

    // Allow other parts of the app to request a refresh (e.g. after logout).
    window.addEventListener(AUTH_STATE_CHANGED_EVENT, loadProfile);

    return () => {
      window.removeEventListener(AUTH_STATE_CHANGED_EVENT, loadProfile);
    };
  }, [loadProfile]);

  const avatarUrl = profile?.avatarHash
    ? `https://cdn.discordapp.com/avatars/${profile.discordId}/${profile.avatarHash}.${profile.avatarHash.startsWith('a_') ? 'gif' : 'png'}?size=64`
    : null;

  const profileInitial = profile?.globalName?.charAt(0).toUpperCase() ?? 'U';

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
            {!loadingProfile && !profile && (
              <Link
                to="/login"
                className={`${styles.navLink} ${isActive('/login') ? styles.active : ''}`}
              >
                Login
              </Link>
            )}
          </div>

          {!loadingProfile && profile && (
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