import type { Request } from 'express';

export type AuthRequest = Request & {
  cookies: {
    sessionId?: string;
  };
  userId?: number;
};
