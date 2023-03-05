import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ParticipantService } from '../services/participant-service.service';
import { Participant } from '../models/participant';
import { MiddlewareApp } from 'src/shared/middleware/middleware.middleware';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantService: ParticipantService) {}

  @Get(':id')
  @UseGuards(MiddlewareApp)
  async findOne(@Param("id") participantID: string): Promise<Participant> {
    return this.participantService.findOne(participantID);
  }

  @Get()
  @UseGuards(MiddlewareApp)
  async findAll(): Promise<Participant[]> {
    return this.participantService.findAll();
  }

  @Post()
  @UseGuards(MiddlewareApp)
  async create(@Body() participant: Participant): Promise<Participant> {
    return this.participantService.create(participant);
  }

  @Put(':id')
  @UseGuards(MiddlewareApp)
  async update(@Param("id") participantID: string, @Body() participant: Participant): Promise<Participant> {
    return this.participantService.update(participantID, participant);
  }

  @Delete(':id')
  @UseGuards(MiddlewareApp)
  async delete(@Param("id") participantID: string): Promise<Participant> {
    return this.participantService.delete(participantID);
  }
}