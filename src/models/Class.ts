import mongoose, { Schema } from 'mongoose';
import { IClass } from '../types';

const ClassSchema = new Schema<IClass>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [200, 'Short description cannot exceed 200 characters'],
    },
    fullDescription: {
      type: String,
      required: [true, 'Full description is required'],
      trim: true,
      minlength: [20, 'Full description must be at least 20 characters'],
    },
    instructor: {
      type: String,
      required: [true, 'Instructor name is required'],
      trim: true,
    },
    style: {
      type: String,
      required: [true, 'Dance style is required'],
      enum: ['Salsa', 'Ballet', 'Hip-Hop', 'Zumba', 'Contemporary', 'Jazz'],
    },
    level: {
      type: String,
      required: [true, 'Skill level is required'],
      enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
ClassSchema.index({ title: 'text', shortDescription: 'text' });
ClassSchema.index({ style: 1 });
ClassSchema.index({ level: 1 });
ClassSchema.index({ price: 1 });
ClassSchema.index({ rating: -1 });
ClassSchema.index({ createdAt: -1 });

export const Class = mongoose.model<IClass>('Class', ClassSchema);