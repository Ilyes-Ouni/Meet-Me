import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';
import { ConferenceController } from './controllers/conference.controller';
import { ConferenceService } from './services/conference.service';
import { ConferenceSchema } from './models/conference';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Conference', schema: ConferenceSchema }]),
    SharedModule,
    AuthModule
  ],
  controllers: [ConferenceController],
  providers: [ConferenceService]
})
export class ConferenceModule {}
