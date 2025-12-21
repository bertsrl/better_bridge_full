import { Controller, Get } from '@nestjs/common';
import * as Discoverer from '@/features/Discoverer/callKommo/_index';

@Controller('api/v1/discoverer-api/kommo/get-pipelines')
export class getPipelinesController {
  constructor() { }
  
  @Get()
  async getCustomFields() {
    const pipelines = await Discoverer.getPipelines();

    return pipelines;
  }
}