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
      headers?: Record<string, string>;
      signal?: AbortSignal
    } = {}
  ): Promise<T> {

    const { method = 'GET', body, headers = {}, signal } = options;

    const config: RequestInit = {
      method,
      credentials: 'include', // Include cookies in requests
      signal,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    };

    if (body !== undefined && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = response.statusText;
      if (errorText) {
        try {
          const parsed = JSON.parse(errorText);
          errorMessage = parsed?.error || parsed?.message || errorMessage;
        } catch {
          errorMessage = errorText;
        }
      }
      throw new Error(`API Error: ${response.status} - ${errorMessage}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const text = await response.text();
    if (!text) {
      return undefined as T;
    }

    try {
      return JSON.parse(text) as T;
    } catch (error) {
      throw new Error('API Error: Invalid JSON response');
    }
  }

  // Convenience methods
  protected async getRequest<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', headers: headers });
  }

  protected async postRequest<T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body, headers: headers });
  }

  protected async putRequest<T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body, headers: headers });
  }

  // NOTE: Maybe we'll add a body for DELETE in the future, if needed, but
  //  we might even remove it entirely
  protected async deleteRequest<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', headers: headers });
  }

  // Health check (global)
  async getHealth(): Promise<HealthResponse> {
    return this.request('/health');
  }
}