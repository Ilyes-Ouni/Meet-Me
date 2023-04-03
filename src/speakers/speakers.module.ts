import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { SpeakerService } from './services/speaker.service';
import { SpeakerController } from "./controllers/speakers.controller";
import { MongooseModule } from '@nestjs/mongoose';
import { SpeakerSchema } from './models/speaker.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Speaker', schema: SpeakerSchema }]),
    SharedModule,
    AuthModule
  ],
  controllers: [SpeakerController],
  providers: [SpeakerService]
})
export class SpeakersModule {}
