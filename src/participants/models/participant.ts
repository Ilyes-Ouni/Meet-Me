import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'registeredAt' } })
export class Participant extends Document {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  birthdate: number;

  @Prop({ required: true })
  phone_number: number;

  @Prop({ required: true })
  region: number;

  @Prop({ required: true })
  city: number;

  @Prop({ required: true })
  conferenceID: number;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
