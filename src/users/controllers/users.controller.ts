import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.schema';
import { MiddlewareApp } from 'src/shared/middleware/middleware.middleware';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @UseGuards(MiddlewareApp)
  async findOne(@Param("id") userID: string): Promise<User> {
    return this.usersService.findOne(userID);
  }

  @Get()
  @UseGuards(MiddlewareApp)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(MiddlewareApp)
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Put(':id')
  @UseGuards(MiddlewareApp)
  async update(@Param("id") userID: string, @Body() user: User): Promise<User> {
    return this.usersService.update(userID, user);
  }

  @Delete(':id')
  @UseGuards(MiddlewareApp)
  async delete(@Param("id") userID: string): Promise<User> {
    return this.usersService.delete(userID);
  }
}