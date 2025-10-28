import { BaseApiClient } from '../base';

export class RootApiClient extends BaseApiClient {
  async getInfo() {
    return this.request('/api/root/info');
  }
}

export const rootApi = new RootApiClient();