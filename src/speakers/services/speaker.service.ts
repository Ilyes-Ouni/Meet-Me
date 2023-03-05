import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Speaker } from '../models/speaker.schema';
import { Db, ObjectId } from 'mongodb';
import { MongoClientService } from 'src/shared/services/mongo-client.service';

@Injectable()
export class SpeakerService {
    constructor(private mongoService: MongoClientService){}
    
    async findAll():Promise<typeof Speaker[] | object>{
        try {
            const db: Db = this.mongoService.getDb();
            const collection = db.collection("speakers");

            const speakers = await collection.find().toArray();
            return speakers;
        } catch (error) { 
            throw new HttpException({
              status: HttpStatus.FORBIDDEN,
              error: 'Error Occured',
            }, HttpStatus.FORBIDDEN, {
              cause: error
            });
        }
    }

    async findOne(speakerID): Promise<typeof Speaker | object> {
        try {
            const db: Db = this.mongoService.getDb();
            const collection = db.collection("speakers");

            const speaker = await collection.findOne({ _id: new ObjectId(speakerID) });
            return speaker
        } catch (error) { 
            throw new HttpException({
              status: HttpStatus.FORBIDDEN,
              error: 'Error Occured',
            }, HttpStatus.FORBIDDEN, {
              cause: error
            });
        }
    }
    
    async create(speaker: Speaker): Promise<number> {
        try {
            const db: Db = this.mongoService.getDb();
            const collection = db.collection("speakers");
            collection.insertOne(speaker)
            return 1
        } catch (error) { 
            throw new HttpException({
              status: HttpStatus.FORBIDDEN,
              error: 'Error Occured',
            }, HttpStatus.FORBIDDEN, {
              cause: error
            });
        }
    }

    async update(id, speaker){
        try {
            const db: Db = this.mongoService.getDb();
            const collection = db.collection("speakers");
            collection.updateOne({ _id: new ObjectId(id) }, { $set: speaker })

            return 1
        } catch (error) { 
            throw new HttpException({
              status: HttpStatus.FORBIDDEN,
              error: 'Error Occured',
            }, HttpStatus.FORBIDDEN, {
              cause: error
            });
        }
    }

    
    async delete(speakerID){
        try {
            const db: Db = this.mongoService.getDb();
            const collection = db.collection("speakers");

            collection.deleteOne({ _id: new ObjectId(speakerID) });
            return 1
        } catch (error) { 
            throw new HttpException({
              status: HttpStatus.FORBIDDEN,
              error: 'Error Occured',
            }, HttpStatus.FORBIDDEN, {
              cause: error
            });
        }
    }
}