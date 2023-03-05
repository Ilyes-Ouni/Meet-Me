import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

interface ContactInfo {
  email: string;
  phone: number;
}

@Schema({ timestamps: true })
export class Speaker extends Document {

  @Prop({required: true})
  firstname: string;

  @Prop({required: true})
  lastname: string;

  @Prop({required: true})
  title: string;

  @Prop({required: true})
  About: string;

  @Prop({required: true})
  age: number;

  @Prop({required: true})
  conferenceID: string;
  
  @Prop({required: true})
  topics: string[];

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    required: true,
    email: { type: String, required: true },
    phone_number: { type: Number, required: true },
  })
  contactInfo: ContactInfo;
}

export const SpeakerSchema = SchemaFactory.createForClass(Speaker);
