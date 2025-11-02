// This file contains type definitions for Discord authentication

export interface DiscordUserProfile {
	discordId: string;
	globalName: string | null;
	avatarHash: string | null;
	accountCreated: string; // ISO string from server
	createdAt: string;
	updatedAt: string;
}
