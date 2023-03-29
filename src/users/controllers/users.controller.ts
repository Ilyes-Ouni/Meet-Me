import { Controller, Get, Post, Put, Res, Delete, Param, Body, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.schema';
import { MiddlewareApp } from 'src/shared/middleware/middleware.middleware';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @UseGuards(MiddlewareApp)
  async findOne(@Param("id") userID: string, @Res() res: Response): Promise<object> {
    try{
      const participant = await this.usersService.findOne(userID);

      if (!participant) return res.status(HttpStatus.BAD_REQUEST).json({message: "User not found"});
      return res.status(200).json({"message": participant});
    }catch(err){
      console.error(err);
      return res.status(500).json({message: "Internal server error"});
    }
  }

  @Get()
  @UseGuards(MiddlewareApp)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(MiddlewareApp)
  async create(@Body() user: User, @Res() res: Response): Promise<object> {
    try {
      const createdUser = await this.usersService.create(user);;
      
      if(!createdUser) res.status(HttpStatus.BAD_REQUEST).json({message: "User already created"});
      return res.status(HttpStatus.CREATED).json(createdUser);
    } catch (error) {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @UseGuards(MiddlewareApp)
  async update(@Param("id") userID: string, @Body() user: User, @Res() res: Response): Promise<object> {
    try{
      let result = await this.usersService.update(userID, user);
      
      if(!result) return res.status(HttpStatus.BAD_REQUEST).json({message: "User failed to be updated"})
      return res.status(200).json({message: "User updated successfully"})
    }catch(err){
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @UseGuards(MiddlewareApp)
  async delete(@Param("id") userID: string,  @Res() res: Response): Promise<object> {
    try{
      let result =await this.usersService.delete(userID);

      if(!result) return res.status(HttpStatus.BAD_REQUEST).json({message: "User failed to be deleted"})
      return res.status(200).json({message: "User deleted successfully"})
    }catch(err){
      return res.status(500).json({message: "Internal Error"})
    }
  }
}
