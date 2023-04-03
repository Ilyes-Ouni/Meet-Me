import { Controller, Headers, Get, Post, Body, Res, Param, Put, Delete, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { LocalStrategy } from 'src/auth/local.auth';
import { MiddlewareApp } from 'src/shared/middleware/middleware.middleware';
import { Speaker } from '../models/speaker.schema';
import { SpeakerService } from '../services/speaker.service';

@Controller('speakers')
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService, private authService: LocalStrategy) {}

  @Get(':id')
  @UseGuards(MiddlewareApp)
  async findOne(@Param("id") speakerID: string, @Res() res: Response): Promise<object>{
    try{
      const speaker = await this.speakerService.findOne(speakerID);
      if (!speaker) return res.status(HttpStatus.BAD_REQUEST).json({message: "Speaker not found"});
      return res.status(200).json({"message": speaker});
    }catch(err){
      console.error(err);
      return res.status(500).json({message: "Internal server error"});
    }
  }

  // @Get()
  // async findAll(@Header() authorization: string): Promise<Speaker[]> {
  //   console.log(req.authorization)
  //   return this.speakerService.findAll();
  // }

  @Get()
  async findAll(@Headers('authorization') authHeader: string,  @Res() res: Response): Promise<Speaker[] | object> {
    try{
      let token = authHeader.split(' ')[1];
      let userFound = await this.authService.validate(token);

      let speakers = await this.speakerService.findAll();
      return res.status(HttpStatus.OK).json({speakers});
    }catch{
      return res.status(HttpStatus.UNAUTHORIZED).json({message: "Unauthorized User"});
    }
  }

  @Post()
    @UseGuards(MiddlewareApp)
    async create(@Body() speaker: Speaker, @Res() res: Response): Promise<Speaker | object> {
    try {
      const createdSpeaker = await this.speakerService.create(speaker);
      
      if(!createdSpeaker) res.status(HttpStatus.BAD_REQUEST).json({message: "Speaker already created"});
      return res.status(HttpStatus.CREATED).json(createdSpeaker);
    } catch (error) {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @UseGuards(MiddlewareApp)
  async update(@Param("id") speakerID: string, @Body() speaker: Speaker, @Res() res: Response): Promise<object> {
    try{
      let result = await this.speakerService.update(speakerID, speaker);
      
      if(!result) return res.status(HttpStatus.BAD_REQUEST).json({message: "Speaker failed to be updated"})
      return res.status(200).json({message: "Speaker updated successfully"})
    }catch(err){
      return res.status(500).json({message: "Internal Error"})
    }
  }

  @Delete(':id')
  @UseGuards(MiddlewareApp)
  async delete(@Param("id") speakerID: string,  @Res() res: Response): Promise<object> {
    try{
      let result = await this.speakerService.delete(speakerID);

      if(!result) return res.status(HttpStatus.BAD_REQUEST).json({message: "Speaker failed to be deleted"})
      return res.status(200).json({message: "Speaker deleted successfully"})
    }catch(err){
      return res.status(500).json({message: "Internal Error"})
    }
  } 
}

