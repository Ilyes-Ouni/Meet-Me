import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Participant } from '../models/participant';

@Injectable()
export class ParticipantService {
  constructor(@InjectModel('Participant') private readonly participantModel: Model<Participant>) {}

  async findAll(): Promise<Participant[]> {
    return await this.participantModel.find().exec();
  }

  async findOne(id: string): Promise<Participant | null> {
    try{
      return this.participantModel.findById(id).exec();
    } catch (error) { 
      return null
    }
  }
      
  async create(participant: Participant): Promise<Participant | null> {
    try {
      const existingParticipant = await this.participantModel.findOne({ conferenceID: participant.conferenceID, email: participant.email });
      
      if (existingParticipant) return null;
      const createdParticipant = new this.participantModel(participant);
      return await createdParticipant.save();
    } catch (error) {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, participant: Participant): Promise<Participant | null> {
    try{
      const existingParticipant = await this.participantModel.findById(id);

      if(!existingParticipant) return null
      let result = await existingParticipant.updateOne(participant);
      return result 
    } catch (error) { 
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string): Promise<any> {
    try{
      return await this.participantModel.findByIdAndRemove(id).exec();
    } catch (error) { 
      return null
    }
  }
}
