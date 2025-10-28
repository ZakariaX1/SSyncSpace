import { Link, useLocation } from 'react-router-dom';
import styles from './IslamNav.module.css';

const IslamNav = () => {
  const location = useLocation();
  
  const islamNavItems = [
    { name: 'Home', path: '/islam' },
    { name: 'Quran', path: '/islam/quran' },
    { name: 'Prayer Times', path: '/islam/prayer-times' },
  ];

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.backLink}>← SSyncSpace</Link>
      <div className={styles.navGroup}>
        <h2 className={styles.spaceTitle}>Islam Space</h2>
        <div className={styles.navLinks}>
          {islamNavItems.map((item) => (
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

export default IslamNav;