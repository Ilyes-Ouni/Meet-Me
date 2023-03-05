import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { SpeakerService } from './services/speaker.service';
import { SpeakerController } from "./controllers/speakers.controller";
import { MongooseModule } from '@nestjs/mongoose';
import { SpeakerSchema } from './models/speaker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Speaker', schema: SpeakerSchema }]),
    SharedModule
  ],
  controllers: [SpeakerController],
  providers: [SpeakerService]
})
export class SpeakersModule {}
