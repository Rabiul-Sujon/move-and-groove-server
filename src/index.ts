import express, { Express, Request, Response } from 'express';
import { connectDB } from './config/db';
import { corsMiddleware } from './config/cors';
import { ENV } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import classRoutes from './routes/classRoutes';

const app: Express = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to DB (cached across warm serverless invocations)
connectDB();

// Routes
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Move & Groove API is running 🕺',
    environment: ENV.NODE_ENV,
  });
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Move & Groove API is running 🕺',
    environment: ENV.NODE_ENV,
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);

// Error handler
app.use(errorHandler);

// Only run app.listen() locally, not on Vercel
if (ENV.NODE_ENV !== 'production') {
  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${ENV.PORT}`);
    console.log(`📁 Environment: ${ENV.NODE_ENV}`);
    console.log(`🕺 Move & Groove API is live!`);
  });
}

export default app;