import dotenv from 'dotenv';
dotenv.config();

export const config = {
  MONGO_URL: process.env.MONGO_URL,
  mongoOptions: {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 1000,
    socketTimeoutMS: 1000,
  },
  PORT: process.env.PORT || 8000,
}