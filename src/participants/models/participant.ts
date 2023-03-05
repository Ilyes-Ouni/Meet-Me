import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'registeredAt' } })
export class Participant extends Document {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  birthdate: number;

  @Prop({ required: true })
  phone_number: number;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
