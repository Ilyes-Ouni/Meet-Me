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
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
  }
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
  phone_number: number;
  Birthdate: Date;
}
