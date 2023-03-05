import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
      type: Date,
      default: Date.now,
   },
  createdBy: {
      type: String,
      required: true,
   },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
  phone_number: number;
  Birthdate: Date;
  createdAt: Date;
  createdBy: string
  updatedAt: Date;
}
