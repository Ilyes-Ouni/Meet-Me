import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../shared/models/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    try{
      let user = await this.userModel.findById(id).exec();
      
      if(user) return user
      return null
    } catch (error) { 
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByEmail(email: string, password: string): Promise<User> {
    try{
      let user = await this.userModel.findOne({email: 'ilyes.ouni70@example.com'});
      console.log(user)
      if(!user) return null
      const passwordValid = await bcrypt.compare(password, user.password)
      
      if(passwordValid) return user;
      else return null;
    } catch (error) { 
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(user: User): Promise<User> {    
    try {
      const existingUser = await this.userModel.findOne({email: user.email});
      if(existingUser) return null

      user.password = await bcrypt.hash(user.password, 10);
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
