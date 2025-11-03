import { api } from '../../../utils/api';
import { useApi } from '../../../hooks/useApi';
import type { DiscordGuild } from '../types';
import { GuildListCard } from '../components/guild/GuildListCard';

function Guilds() {
  const { data: guildsData, loading, error } = useApi<DiscordGuild[]>(() => api.discord.getGuilds());
  if (loading) return <div>Loading Guilds...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Discord Guilds</h2>
      <p>Find registered discord guilds here!</p>
      {guildsData && (
        <ul style={{ marginTop: '2rem' }}>
          {guildsData.map((guild) => (
            <GuildListCard key={guild.guildId} guild={guild} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Guilds;