import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { SpeakersModule } from './speakers/speakers.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { ParticipantsModule } from './participants/participants.module';
require('dotenv').config();

@Module({
  imports: [
    JwtModule.register({
       secret: process.env.SECRET_KEY,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_URI,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    SpeakersModule, 
    SharedModule, 
    AuthModule, 
    UsersModule, 
    ParticipantsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
