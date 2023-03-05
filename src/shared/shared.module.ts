import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClientService } from './services/mongo-client.service';

@Module({
  imports:[
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_URI,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  ],
  providers: [MongoClientService],
  exports: [
    MongoClientService
  ]
})
export class SharedModule {}
