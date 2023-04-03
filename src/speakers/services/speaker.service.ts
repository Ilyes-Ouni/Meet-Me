import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Speaker } from '../models/speaker.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SpeakerService {
    constructor(@InjectModel('Speaker') private readonly speakerModel: Model<Speaker>){}
    
    async findAll(): Promise<Speaker[]> {
      return await this.speakerModel.find().exec();
    }
  

    async findOne(id: string): Promise<Speaker | null> {
      try{
        return this.speakerModel.findById(id).exec();
      } catch (error) { 
        return null
      }
    }

    async create(speaker: Speaker): Promise<Speaker | null> {
      try {
        const existingSpeaker = await this.speakerModel.findOne({ conferenceID: speaker.conferenceID });
        
        if (existingSpeaker) return null;
        const createdParticipant = new this.speakerModel(speaker);
        return await createdParticipant.save();
      } catch (error) {
          throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }


async update(id: string, speaker: Speaker): Promise<Speaker | null> {
  try{
    const existingSpeaker = await this.speakerModel.findById(id);

    if(!existingSpeaker) return null
    let result = await existingSpeaker.updateOne(speaker);
    return result 
  } catch (error) { 
    throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

async delete(id: string): Promise<any> {
  try{
    return await this.speakerModel.findByIdAndRemove(id).exec();
  } catch (error) { 
    return null
  }
}
}