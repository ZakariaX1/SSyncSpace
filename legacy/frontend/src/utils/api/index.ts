import { BaseApiClient } from './base';
import { rootApi } from './root';
import { islamApi } from './islam';
import { discordApi } from './discord';

// Global API instance for health checks
const baseApi = new BaseApiClient();

// Export organized API
export const api = {
  // Global
  getHealth: () => baseApi.getHealth(),
  
  // Space-specific
  root: rootApi,
  islam: islamApi,
  discord: discordApi,
};

// Also export individual clients if needed
export { rootApi, islamApi, discordApi };