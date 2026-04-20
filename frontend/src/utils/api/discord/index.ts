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

  // HINT: Add a refresh method here that calls POST /auth/refresh with NO body.
  // The browser's credentials: 'include' already handles sending the HttpOnly cookie.
  // Example pattern:
  // async refresh(): Promise<void> {
  //   return this.postRequest('/auth/refresh', {});
  // }
  //
  // This method will:
  // 1. Browser auto-sends HttpOnly refresh cookie
  // 2. Backend validates cookie, generates new pair
  // 3. Browser receives new cookies (automatically stored as HttpOnly)
  // 4. No sensitive token data ever appears in client code or logs

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