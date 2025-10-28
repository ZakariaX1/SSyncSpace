import { Link } from 'react-router-dom';
import RootNav from '../components/RootNav';

function Spaces() {
  const spaces = [
    {
      name: 'Islam Space',
      path: '/islam',
      description: 'Quran reader and prayer times',
      color: 'var(--color-space-islam)'
    },
    {
      name: 'Discord Space', 
      path: '/discord',
      description: 'Event planning and community tools',
      color: 'var(--color-space-discord)'
    }
  ];

  return (
    <div>
      <RootNav />
      <h2>Available Spaces</h2>
      <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
        {spaces.map((space) => (
          <Link
            key={space.path}
            to={space.path}
            style={{
              display: 'block',
              padding: '1.5rem',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              color: 'inherit',
              border: `2px solid ${space.color}`,
              transition: 'all 0.2s'
            }}
          >
            <h3 style={{ color: space.color, marginBottom: '0.5rem' }}>
              {space.name}
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              {space.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Spaces;