import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class MongoClientService implements OnApplicationBootstrap, OnApplicationShutdown {
    private client: MongoClient;
    private db: Db;
  
    async onApplicationBootstrap() {
      const uri = 'mongodb+srv://ilyes:ilyesOuni132@firstcluster.xxu2osc.mongodb.net/MeetMe?retryWrites=true&w=majority';
      this.client = await MongoClient.connect(uri);
      this.db = this.client.db('MeetMe');
    }
  
    async onApplicationShutdown() {
      if (this.client) {
        await this.client.close();
      }
    }
  
    getDb(): Db {
      return this.db;
    }
}
