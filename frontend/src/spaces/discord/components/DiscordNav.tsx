import { Link, useLocation } from 'react-router-dom';
import styles from './DiscordNav.module.css';

const DiscordNav = () => {
  const location = useLocation();
  
  const discordNavItems = [
    { name: 'Home', path: '/discord' },
    { name: 'Events', path: '/discord/events' },
    { name: 'Auth', path: '/discord/auth' },
  ];

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.backLink}>← SSyncSpace</Link>
      <div className={styles.navGroup}>
        <h2 className={styles.spaceTitle}>Discord Space</h2>
        <div className={styles.navLinks}>
          {discordNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navLink} ${
                location.pathname === item.path ? styles.active : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default DiscordNav;