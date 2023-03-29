import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Res, HttpStatus, HttpException } from '@nestjs/common';
import { ParticipantService } from '../services/participant-service.service';
import { Participant } from '../models/participant';
import { MiddlewareApp } from 'src/shared/middleware/middleware.middleware';
import { Response } from 'express';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantService: ParticipantService) {}

  @Get(':id')
  @UseGuards(MiddlewareApp)
  async findOne(@Param("id") participantID: string, @Res() res: Response): Promise<object>{
    try{
      const participant = await this.participantService.findOne(participantID);
      if (!participant) return res.status(HttpStatus.BAD_REQUEST).json({message: "Participant not found"});
      return res.status(200).json({"message": participant});
    }catch(err){
      console.error(err);
      return res.status(500).json({message: "Internal server error"});
    }
  }


  @Get()
  @UseGuards(MiddlewareApp)
  async findAll(): Promise<Participant[]> {
    return this.participantService.findAll();
  }

    @Post()
    @UseGuards(MiddlewareApp)
    async create(@Body() participant: Participant, @Res() res: Response): Promise<object> {
    try {
      const createdParticipant = await this.participantService.create(participant);
      
      if(!createdParticipant) res.status(HttpStatus.BAD_REQUEST).json({message: "Participant already created"});
      return res.status(HttpStatus.CREATED).json(createdParticipant);
    } catch (error) {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @UseGuards(MiddlewareApp)
  async update(@Param("id") participantID: string, @Body() participant: Participant, @Res() res: Response): Promise<object> {
    try{
      let result = await this.participantService.update(participantID, participant);
      
      if(!result) return res.status(HttpStatus.BAD_REQUEST).json({message: "Participant failed to be updated"})
      return res.status(200).json({message: "Participant updated successfully"})
    }catch(err){
      return res.status(500).json({message: "Internal Error"})
    }
  }

  @Delete(':id')
  @UseGuards(MiddlewareApp)
  async delete(@Param("id") participantID: string,  @Res() res: Response): Promise<object> {
    try{
      let result = await this.participantService.delete(participantID);

      if(!result) return res.status(HttpStatus.BAD_REQUEST).json({message: "Participant failed to be deleted"})
      return res.status(200).json({message: "Participant deleted successfully"})
    }catch(err){
      return res.status(500).json({message: "Internal Error"})
    }
  }
}
