import { BaseApiClient } from '../base';
import type { DiscordEventsResponse } from '../../../spaces/discord/types';
import type { ApiInfoResponse } from '../../../types/global';


export class DiscordApiClient extends BaseApiClient {
  async getInfo(): Promise<ApiInfoResponse> {
    return this.getRequest('/api/discord/info');
  }

  async getEvents(): Promise<DiscordEventsResponse> {
    return this.getRequest('/api/discord/events');
  }

  // Ready for future modular expansion:
  // events = new EventsApi(this.baseUrl);
  // auth = new AuthApi(this.baseUrl);
  // guilds = new GuildsApi(this.baseUrl);
}

export const discordApi = new DiscordApiClient();