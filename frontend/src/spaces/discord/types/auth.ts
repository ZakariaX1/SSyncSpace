// This file contains type definitions for Discord authentication

export interface DiscordUserLoginResponse {
	message?: string,
	user?: DiscordUserProfile
	error?: string
}

export interface DiscordUserProfile {
	discordId: string;
	globalName: string | null;
	avatarHash: string | null;
	accountCreated: string; // ISO string from server
	createdAt: string;
	updatedAt: string;
}

export interface UserContextValue {
  user: DiscordUserProfile | null;
  loading: boolean;
  login: (user: DiscordUserProfile | null) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
};