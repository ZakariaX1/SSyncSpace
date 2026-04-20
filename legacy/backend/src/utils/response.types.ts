export enum ResponseStatus {
    // 2xx Success
    SUCCESS = 200,        // Generic success
    CREATED = 201,        // Resource created
    ACCEPTED = 202,       // Request accepted for processing
    NO_CONTENT = 204,     // Nothing to show

    // 4xx Client Errors
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,

    // 5xx Server Errors
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504
}

export const ERROR_MESSAGES = {
    // General
    INVALID_DISCORD_ID: 'Invalid Discord ID format',
    
    // Auth
    CODE_MISSING: 'No code was given',
    SESSION_EXPIRED: 'Session expired',
    INVALID_SESSION: 'Invalid session token',
    UNAUTHORIZED: 'Authentication required',
    FORBIDDEN: 'Access denied',
    LOGIN_FAILED: 'Login failed, please try again later or contact support',

    // User
    DISCORD_USER_NOT_FOUND: 'Discord user not found, likely not linked',
    COULD_NOT_FETCH_DISCORD_USER_DATA: 'Could not fetch Discord user data',
} as const;

export interface ApiResponse<T> {
    status: ResponseStatus;
    data?: T;
    error?: string;
}