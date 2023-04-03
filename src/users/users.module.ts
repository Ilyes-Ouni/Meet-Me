import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';
import { UsersController } from './controllers/users.controller';
import { UserSchema } from '../shared/models/user.schema';
import { UsersService } from './services/users.service';
require('dotenv').config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
   }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    SharedModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [ UsersService]
})
export class UsersModule {}
