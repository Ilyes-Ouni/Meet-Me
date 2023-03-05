import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';
import { ParticipantsController } from './controllers/participants.controller';
import { ParticipantSchema } from './models/participant';
import { ParticipantService } from './services/participant-service.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Participant', schema: ParticipantSchema }]),
    SharedModule
  ],
  controllers: [ParticipantsController],
  providers: [ParticipantService]
})
export class ParticipantsModule {}
