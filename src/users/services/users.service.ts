import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    try{
      return this.userModel.findById(id).exec();
    } catch (error) { 
      return null
    }
  }

  async create(user: User): Promise<User> {    
    try {
      const existingUser = await this.userModel.findOne({email: user.email});
      if(existingUser) return null

      const createdUser = new this.userModel(user);
      return await createdUser.save();
    } catch (error) {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, user: User): Promise<User> {
    try{
        const existingUser = await this.userModel.findById(id).exec();
        if (!existingUser) return null;
        
        let result = await existingUser.updateOne(user)
        return result;
    } catch (error) {
      console.log(error)
    }
  }

  async delete(id: string): Promise<any> {
    try{
      return await this.userModel.findByIdAndRemove(id).exec();
    } catch (error) { 
      return null
    }
  }
}
