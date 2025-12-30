import { BaseApiClient } from '../base';
import type { DiscordEvent, DiscordGuild, DiscordUserLoginResponse, DiscordUserProfile } from '../../../spaces/discord/types';
import type { ApiInfoResponse } from '../../../types/global';


export class DiscordApiClient extends BaseApiClient {
  async getInfo(): Promise<ApiInfoResponse> {
    return this.getRequest('/api/discord/info');
  }

  async login(code: string): Promise<DiscordUserLoginResponse> {
    return this.postRequest('/api/discord/auth/login', { code });
  }

  async logout(): Promise<void> {
    return this.postRequest('/api/discord/auth/logout', {});
  }

  async getProfile(): Promise<DiscordUserProfile | undefined> {
    return this.getRequest('/api/discord/users/profile');
  }

  async getEvents(guildId: string): Promise<DiscordEvent[]> {
    return this.getRequest(`/api/discord/guilds/${guildId}/events`);
  }

  async getGuilds(): Promise<DiscordGuild[]> {
    return this.getRequest('/api/discord/guilds');
  }

  async getGuild(guildId: string): Promise<DiscordGuild> {
    return this.getRequest(`/api/discord/guilds/${guildId}`);
  }

  // Ready for future modular expansion:
  // events = new EventsApi(this.baseUrl);
  // auth = new AuthApi(this.baseUrl);
  // guilds = new GuildsApi(this.baseUrl);
}

export const discordApi = new DiscordApiClient();