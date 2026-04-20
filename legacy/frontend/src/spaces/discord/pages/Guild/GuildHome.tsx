import { useParams } from "react-router-dom";
import { discordApi } from "../../../../utils/api";
import { useApi } from "../../../../hooks/useApi";
import type { DiscordGuild } from "../../types";

function GuildHome() {
    const guildId = useParams<{ guildId: string }>().guildId;
    const { data: guildData, loading, error } = useApi<DiscordGuild>(
        () => discordApi.getGuild(guildId!),
        [guildId]
    );

    if (loading) return <div>Loading guild...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {/* Guild Home Page Content */}
            <p>This is the home page for guild: {guildData?.guildName}</p>
        </div>
    );
}

export default GuildHome;