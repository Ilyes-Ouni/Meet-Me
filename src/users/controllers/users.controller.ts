import { Controller, Headers, Get, Post, Put, Res, Delete, Param, Body, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../../shared/models/user.schema';
import { MiddlewareApp } from 'src/shared/middleware/middleware.middleware';
import { Response } from 'express';
import { LocalStrategy } from 'src/auth/local.auth';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private authService: LocalStrategy) {}

  @Get(':id')
  @UseGuards(MiddlewareApp)
  async findOne(@Headers('authorization') authHeader: string, @Param("id") userID: string, @Res() res: Response): Promise<object> {
    try{
      let token = authHeader.split(' ')[1];
      let userFound = await this.authService.validate(token);

      if (!userFound) return res.status(HttpStatus.UNAUTHORIZED).json({message: "Unauthorized"});
      const user = await this.usersService.findOne(userID);

      if (!user) return res.status(HttpStatus.BAD_REQUEST).json({message: "User not found"});
      return res.status(200).json({"message": user});
    }catch(err){
      console.error(err);
      return res.status(500).json({message: "Internal server error"});
    }
  }

  @Get()
  @UseGuards(MiddlewareApp)
  async findAll(@Headers('authorization') authHeader: string, @Res() res: Response): Promise<object> {
    try{
      let token = authHeader.split(' ')[1];
      let userFound = await this.authService.validate(token);

      if (!userFound) return res.status(HttpStatus.UNAUTHORIZED).json({message: "Unauthorized"});
      return res.status(HttpStatus.ACCEPTED).json({message: this.usersService.findAll()});
    }catch(err){
      console.error(err);
      return res.status(500).json({message: "Internal server error"});
    }
  }

  @Post()
  @UseGuards(MiddlewareApp)
  async create(@Headers('authorization') authHeader: string, @Body() user: User, @Res() res: Response): Promise<object> {
    try {
      let token = authHeader.split(' ')[1];
      let userFound = await this.authService.validate(token);

      if (!userFound) return res.status(HttpStatus.UNAUTHORIZED).json({message: "Unauthorized"});
      const createdUser = await this.usersService.create(user);;
      
      if(!createdUser) res.status(HttpStatus.BAD_REQUEST).json({message: "User already created"});
      return res.status(HttpStatus.CREATED).json(createdUser);
    } catch (error) {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @UseGuards(MiddlewareApp)
  async update(@Headers('authorization') authHeader: string, @Param("id") userID: string, @Body() user: User, @Res() res: Response): Promise<object> {
    try{
      let token = authHeader.split(' ')[1];
      let userFound = await this.authService.validate(token);

      if (!userFound) return res.status(HttpStatus.UNAUTHORIZED).json({message: "Unauthorized"});
      let result = await this.usersService.update(userID, user);
      
      if(!result) return res.status(HttpStatus.BAD_REQUEST).json({message: "User failed to be updated"})
      return res.status(200).json({message: "User updated successfully"})
    }catch(err){
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @UseGuards(MiddlewareApp)
  async delete(@Headers('authorization') authHeader: string, @Param("id") userID: string,  @Res() res: Response): Promise<object> {
    try{
      let token = authHeader.split(' ')[1];
      let userFound = await this.authService.validate(token);

      if (!userFound) return res.status(HttpStatus.UNAUTHORIZED).json({message: "Unauthorized"});
      let result =await this.usersService.delete(userID);

      if(!result) return res.status(HttpStatus.BAD_REQUEST).json({message: "User failed to be deleted"})
      return res.status(200).json({message: "User deleted successfully"})
    }catch(err){
      return res.status(500).json({message: "Internal Error"})
    }
  }
}