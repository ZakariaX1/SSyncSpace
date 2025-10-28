import { Link, useLocation } from 'react-router-dom';
import styles from './RootNav.module.css';

const RootNav = () => {
  const location = useLocation();
  
  const rootNavItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Spaces', path: '/spaces' },
  ];

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>SSyncSpace</Link>
      <div className={styles.navGroup}>
        {rootNavItems.map((item) => (
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
    </nav>
  );
};

export default RootNav;