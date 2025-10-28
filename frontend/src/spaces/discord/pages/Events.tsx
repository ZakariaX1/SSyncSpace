import { api } from '../../../utils/api';
import { useApi } from '../../../hooks/useApi';
import type { DiscordEventsResponse } from '../types';

function Events() {
  const { data: eventsData, loading, error } = useApi<DiscordEventsResponse>(() => api.discord.getEvents());

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Discord Events</h3>
      <p>Manage and schedule community events</p>
      
      {eventsData && eventsData.events && (
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ color: 'var(--color-space-discord)' }}>
              Upcoming Events ({eventsData.events.length})
            </h4>
            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--color-space-discord)',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}>
              Create Event
            </button>
          </div>
          
          {eventsData.events.map((event) => (
            <div 
              key={event.id}
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--color-space-discord)',
                marginBottom: '1rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h5 style={{ color: 'var(--color-text-primary)', margin: '0 0 0.5rem 0' }}>
                    {event.title}
                  </h5>
                  <p style={{ color: 'var(--color-text-secondary)', margin: '0' }}>
                    {event.description}
                  </p>
                </div>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: event.status === 'scheduled' ? 'var(--color-space-discord)' : 'var(--color-text-secondary)',
                  color: 'white',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  textTransform: 'capitalize'
                }}>
                  {event.status}
                </span>
              </div>
              <div style={{ color: 'var(--color-space-discord)', fontSize: '0.875rem' }}>
                📅 {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;