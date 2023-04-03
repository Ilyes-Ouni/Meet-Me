import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'registeredAt' } })
export class Conference extends Document {
 
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  capacite: number;

  @Prop({ required: true })
  dateDebut: Date;

  @Prop({ required: true })
  startTime: number;

  @Prop({ required: true })
  endTime: number;

  @Prop({ required: true })
  topic: String;

  @Prop({ required: true })
  duree: number;

  @Prop({ required: true })
  pays: String;

  @Prop({ required: true })
  region: String;
}

export const ConferenceSchema = SchemaFactory.createForClass(Conference);
