import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    discordId: string;
    // ... Other important properties in the payload
  };
}