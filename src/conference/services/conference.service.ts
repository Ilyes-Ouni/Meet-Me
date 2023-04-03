import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Conference } from '../models/conference';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ConferenceService {
    constructor(@InjectModel('Conference') private readonly conferenceModel: Model<Conference>){}

    async findAll(): Promise<Conference[]> {
        return await this.conferenceModel.find().exec();
      }
    

      async findOne(id: string): Promise<Conference | null> {
        try{
          return this.conferenceModel.findById(id).exec();
        } catch (error) { 
          return null
        }
      }

  async create(id: string, conference: Conference): Promise<Conference | null> {
    try {
      const existingConference = await this.conferenceModel.findById(id);
  
      if (existingConference) {
        return existingConference;
      }
  
      const createdConference = new this.conferenceModel(conference);
      return await createdConference.save();
     } catch (error) {
       throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
     }
  }
  

  async update(id: string, conference: Conference): Promise<Conference | null> {
    try{
      const existingConference = await this.conferenceModel.findById(id);

      if(!existingConference) return null
      let result = await existingConference.updateOne(conference);
      return result 
    } catch (error) { 
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<any> {
    try{
      return await this.conferenceModel.findByIdAndRemove(id).exec();
    } catch (error) { 
      return null
    }
  }
}

