import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { MiddlewareApp } from 'src/shared/middleware/middleware.middleware';
import { Conference } from '../models/conference';
import { ConferenceService } from '../services/conference.service';
import { Response } from 'express';

@Controller('conferences')
export class ConferenceController {
    constructor(private readonly conferenceService: ConferenceService) {}

    @Get(':id')
    @UseGuards(MiddlewareApp)
    async findOne(@Param("id") conferenceID: string, @Res() res: Response): Promise<object>{
      try{
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
    async findAll(): Promise<Conference[]> {
      return this.conferenceService.findAll();
    }
  
      @Post()
      @UseGuards(MiddlewareApp)
      async create( @Param("id") id: string, @Body() conference: Conference, @Res() res: Response): Promise<object> {
      try {
        const createdConference = await this.conferenceService.create(id,conference);
        
        if(!createdConference) res.status(HttpStatus.BAD_REQUEST).json({message: "Conference already created"});
        return res.status(HttpStatus.CREATED).json(createdConference);
      } catch (error) {
           throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
  
    @Put(':id')
    @UseGuards(MiddlewareApp)
    async update(@Param("id") conferenceID: string, @Body() conference: Conference, @Res() res: Response): Promise<object> {
      try{
        let result = await this.conferenceService.update(conferenceID, conference);
        
        if(!result) return res.status(HttpStatus.BAD_REQUEST).json({message: "Conference failed to be updated"})
        return res.status(200).json({message: "Confrence updated successfully"})
      }catch(err){
        return res.status(500).json({message: "Internal Error"})
      }
    }
  
    @Delete(':id')
    @UseGuards(MiddlewareApp)
    async delete(@Param("id") conferenceID: string,  @Res() res: Response): Promise<object> {
      try{
        let result = await this.conferenceService.delete(conferenceID);
  
        if(!result) return res.status(HttpStatus.BAD_REQUEST).json({message: "Conference failed to be deleted"})
        return res.status(200).json({message: "Conference deleted successfully"})
      }catch(err){
        return res.status(500).json({message: "Internal Error"})
      }
    }
}
