// Only truly global types that ALL spaces use
export interface HealthResponse {
  status: string;
  timestamp: string;
  message: string;
}

export interface ApiInfoResponse {
  space: string;
  message: string;
  availableEndpoints: string[];
}

export interface ApiError {
  error: string;
  path?: string;
}