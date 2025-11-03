import styles from './GuildListCard.module.css'
import type { DiscordGuild } from "../../types";
import { useNavigate } from 'react-router-dom';

type GuildCardProps = {
	guild: DiscordGuild;
};

export function GuildListCard({ guild }: GuildCardProps) {
	const navigate = useNavigate();
	return (
		<li className={styles.card}>
			<div className={styles.identifiers}>
				<img
					// https://cdn.discordapp.com/icons/1193841000108531764/a_27e40345d24846a5b6904dc65a8c55cb.png
					src={guild.iconHash ? `https://cdn.discordapp.com/icons/${guild.guildId}/${guild.iconHash}.png` : ''}
					alt={`${guild.guildName} icon`}
					className={styles.icon}
				/>
				<h3 className={styles.title}>{guild.guildName}</h3>
			</div>
			<p className={styles.info} >On our platform since: {new Date(guild.createdAt).toLocaleDateString()}</p>
			<button onClick={() => navigate(`/discord/guilds/${guild.guildId}`)}>
				Show {guild.guildName}'s server contents
			</button>
		</li>
	);
}