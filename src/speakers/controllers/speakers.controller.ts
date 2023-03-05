import { Controller, Get, Post, Body, Res, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { MiddlewareApp } from 'src/shared/middleware/middleware.middleware';
import { Speaker } from '../models/speaker.schema';
import { SpeakerService } from '../services/speaker.service';

@Controller('speakers')
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

  @Get(':id')
  @UseGuards(MiddlewareApp)
  async findOne(@Param("id") speakerID: string, @Res() res: Response) {
    const Result: typeof Speaker|object = await this.speakerService.findOne(speakerID);
    return res.status(200).json({Result})
  }

  @Get()
  @UseGuards(MiddlewareApp)
  async findAll(@Res() res: Response) {
    const Result: Speaker[]|object = await this.speakerService.findAll();
    if(Object.prototype.toString.call(Result) === '[object Object]') res.status(404).json({Result})
    else res.status(200).json({Result})
  }


  @Post()
  @UseGuards(MiddlewareApp)
  async create(@Body() speaker: Speaker, @Res() res: Response) {
     const Result:number = await this.speakerService.create(speaker);
     if(Result == 1) res.status(200).json({message: "speakerModel created Successfully"});
     if(Result == 0) res.status(404).json({message: "Error Occured"});
  }

  @Put(':id')
  @UseGuards(MiddlewareApp)
  async update(@Param("id") speakerID: string, @Body() speaker: typeof Speaker, @Res() res: Response) {
     const Result:number = await this.speakerService.update(speakerID, speaker);
     if(Result == 1) res.status(200).json({message: "speakerModel updated Successfully"});
     if(Result == 0) res.status(404).json({message: "Error Occured"});
  }

  @Delete(':id')
  @UseGuards(MiddlewareApp)
  async delete(@Param("id") speakerID: string, @Res() res: Response) {
     const Result:number = await this.speakerService.delete(speakerID);
     if(Result == 1) res.status(200).json({message: "speakerModel deleted Successfully"});
     if(Result == 0) res.status(404).json({message: "Error Occured"});
  }
}

