import cors from 'cors';

export const corsMiddleware = cors({
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200,
});