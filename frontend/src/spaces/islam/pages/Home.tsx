import { api } from "../../../utils/api";
import { useApi } from "../../../hooks/useApi";

function Home() {
  
  const { data: prayerTimes, loading, error } = useApi(() => api.islam.getPrayerTimes());

  if (loading) return <div>Loading prayer times...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Islam Space Home</h3>
      <p>Quran reader and prayer times coming soon...</p>

      {prayerTimes && (
        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          backgroundColor: 'var(--color-bg-secondary)', 
          borderRadius: '0.5rem',
          border: '1px solid var(--color-space-islam)'
        }}>
          <h4 style={{ color: 'var(--color-space-islam)', marginBottom: '1rem' }}>
            Today's Prayer Times [DEMO, NOT ACTUAL TIMES]
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {Object.entries(prayerTimes.times).map(([prayer, time]) => (
              <div key={prayer} style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontWeight: 'bold', 
                  textTransform: 'capitalize',
                  color: 'var(--color-text-primary)'
                }}>
                  {prayer}
                </div>
                <div style={{ color: 'var(--color-text-secondary)' }}>
                  {time}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;