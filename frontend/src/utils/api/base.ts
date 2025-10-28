import type { HealthResponse } from "../../types/global";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export class BaseApiClient {
  protected baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  protected async request<T>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      body?: any;
      headers?: Record<string, string>
    } = {}
  ): Promise<T> {

    const { method = 'GET', body, headers = {} } = options;

    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    };

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`API Error: ${response.status} - ${errorData.error || response.statusText}`);
    }
    
    return response.json();
  }

  // Convenience methods
  protected async getRequest<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  protected async postRequest<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  protected async putRequest<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  // NOTE: Maybe we'll add a body for DELETE in the future, if needed, but
  //  we might even remove it entirely
  protected async deleteRequest<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Health check (global)
  async getHealth(): Promise<HealthResponse> {
    return this.request('/health');
  }
}