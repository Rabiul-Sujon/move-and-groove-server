import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'default_secret_change_me',
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
};

if (!ENV.MONGODB_URI) {
  console.error('❌ MONGODB_URI is required in .env file');
  process.exit(1);
}

if (ENV.JWT_SECRET === 'default_secret_change_me' && ENV.NODE_ENV === 'production') {
  console.error('❌ JWT_SECRET must be changed in production');
  process.exit(1);
}