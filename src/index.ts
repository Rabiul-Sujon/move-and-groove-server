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

// Routes
app.get('/health', (req: Request, res: Response) => {
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

// Start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(ENV.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${ENV.PORT}`);
      console.log(`📁 Environment: ${ENV.NODE_ENV}`);
      console.log(`🕺 Move & Groove API is live!`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;