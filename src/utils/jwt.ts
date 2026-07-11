import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export interface IJWTPayload {
  id: string;
  email: string;
  role: string;
}

export function generateToken(payload: IJWTPayload): string {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): IJWTPayload {
  return jwt.verify(token, ENV.JWT_SECRET) as IJWTPayload;
}