import mongoose from 'mongoose';
import { ENV } from './env';

let cachedConnection: Promise<typeof mongoose> | null = null;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!cachedConnection) {
    cachedConnection = mongoose.connect(ENV.MONGODB_URI);
  }

  try {
    await cachedConnection;
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
    return mongoose.connection;
  } catch (error) {
    cachedConnection = null; // reset so next request can retry
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    cachedConnection = null;
    console.log('✅ MongoDB disconnected');
  }
}