import { api } from '../../../utils/api';
import { useApi } from '../../../hooks/useApi';
import type { DiscordGuild } from '../types';

function Guilds() {
  const { data: guildsData, loading, error } = useApi<DiscordGuild[]>(() => api.discord.getGuilds());
  if (loading) return <div>Loading Guilds...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Discord Guilds</h2>
      <p>Manage your Discord guilds here.</p>
      {guildsData && (
        <ul style={{ marginTop: '2rem' }}>
          {guildsData.map((guild) => (
            <li 
              key={guild.guildId}
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--color-space-discord)',
                marginBottom: '1rem'
              }}
            >
              <h4 style={{ color: 'var(--color-text-primary)', margin: '0 0 0.5rem 0' }}>
                {guild.guildName}
              </h4>
              <p style={{ color: 'var(--color-text-secondary)', margin: '0' }}>
                Guild ID: {guild.guildId} | On the platform since: {new Date(guild.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Guilds;