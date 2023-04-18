import { Body, Headers, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { MiddlewareApp } from 'src/shared/middleware/middleware.middleware';
import { Conference } from '../models/conference';
import { ConferenceService } from '../services/conference.service';
import { Response } from 'express';
import { LocalStrategy } from 'src/auth/local.auth';

@Controller('conferences')
export class ConferenceController {
    constructor(private readonly conferenceService: ConferenceService,  private authService: LocalStrategy) {}

    @Get(':id')
    @UseGuards(MiddlewareApp)
    async findOne(@Headers('authorization') authHeader: string, @Param("id") conferenceID: string, @Res() res: Response): Promise<object>{
      try{
        let token = authHeader.split(' ')[1];
        let userFound = await this.authService.validate(token);
  
        if (!userFound) return res.status(HttpStatus.UNAUTHORIZED).json({message: "Unauthorized"});
        const conference = await this.conferenceService.findOne(conferenceID);
        if (!conference) return res.status(HttpStatus.BAD_REQUEST).json({message: "Conference not found"});
        return res.status(200).json({"message": conference});
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
        let conferences: Conference[] = await this.conferenceService.findAll()
        return res.status(HttpStatus.ACCEPTED).json({message: conferences});
      }catch(err){
        console.error(err);
        return res.status(500).json({message: "Internal server error"});
      }
    }
  
      @Post()
      @UseGuards(MiddlewareApp)
      async create(@Headers('authorization') authHeader: string, @Param("id") id: string, @Body() conference: Conference, @Res() res: Response): Promise<object> {
      try {
        let token = authHeader.split(' ')[1];
        let userFound = await this.authService.validate(token);
  
        if (!userFound) return res.status(HttpStatus.UNAUTHORIZED).json({message: "Unauthorized"});
        const createdConference = await this.conferenceService.create(id,conference);
        
        if(!createdConference) res.status(HttpStatus.BAD_REQUEST).json({message: "Conference already created"});
        return res.status(HttpStatus.CREATED).json(createdConference);
      } catch (error) {
           throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
  
    @Put(':id')
    @UseGuards(MiddlewareApp)
    async update(@Headers('authorization') authHeader: string, @Param("id") conferenceID: string, @Body() conference: Conference, @Res() res: Response): Promise<object> {
      try{
        let token = authHeader.split(' ')[1];
        let userFound = await this.authService.validate(token);
  
        if (!userFound) return res.status(HttpStatus.UNAUTHORIZED).json({message: "Unauthorized"});
        let result = await this.conferenceService.update(conferenceID, conference);
        
        if(!result) return res.status(HttpStatus.BAD_REQUEST).json({message: "Conference failed to be updated"})
        return res.status(200).json({message: "Conference updated successfully"})
      }catch(err){
        return res.status(500).json({message: "Internal Error"})
      }
    }
  
    @Delete(':id')
    @UseGuards(MiddlewareApp)
    async delete(@Headers('authorization') authHeader: string, @Param("id") conferenceID: string,  @Res() res: Response): Promise<object> {
      try{
        let token = authHeader.split(' ')[1];
        let userFound = await this.authService.validate(token);
  
        if (!userFound) return res.status(HttpStatus.UNAUTHORIZED).json({message: "Unauthorized"});
        let result = await this.conferenceService.delete(conferenceID);
  
        if(!result) return res.status(HttpStatus.BAD_REQUEST).json({message: "Conference failed to be deleted"})
        return res.status(200).json({message: "Conference deleted successfully"})
      }catch(err){
        return res.status(500).json({message: "Internal Error"})
      }
    }
}
