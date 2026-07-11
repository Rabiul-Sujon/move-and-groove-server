import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IClass extends Document {
  _id: Types.ObjectId;
  title: string;
  shortDescription: string;
  fullDescription: string;
  instructor: string;
  style: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  price: number;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}