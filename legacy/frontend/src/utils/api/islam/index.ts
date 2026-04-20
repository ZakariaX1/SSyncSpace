import { BaseApiClient } from '../base';
import type { PrayerTimes } from '../../../spaces/islam/types';
import type { ApiInfoResponse } from '../../../types/global';

export class IslamApiClient extends BaseApiClient {
  async getInfo(): Promise<ApiInfoResponse> {
    return this.getRequest('/api/islam/info');
  }

  async getPrayerTimes(): Promise<PrayerTimes> {
    return this.getRequest('/api/islam/prayer-times');
  }

  // Ready for future modular expansion:
  // prayer = new PrayerApi(this.baseUrl);
  // quran = new QuranApi(this.baseUrl);
}

export const islamApi = new IslamApiClient();