import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Participant } from '../models/participant';

@Injectable()
export class ParticipantService {
  constructor(@InjectModel('Participant') private readonly participantModel: Model<Participant>) {}

  async findAll(): Promise<Participant[]> {
    return await this.participantModel.find().exec();
  }

  async findOne(id: string): Promise<Participant> {
    return this.participantModel.findById(id).exec();
  }

  async create(user: Participant): Promise<Participant> {
    const createdUser = new this.participantModel(user);
    return createdUser.save();
  }

  async update(id: string, user: Participant): Promise<Participant> {
    return this.participantModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.participantModel.findByIdAndDelete(id).exec();
  }
}
