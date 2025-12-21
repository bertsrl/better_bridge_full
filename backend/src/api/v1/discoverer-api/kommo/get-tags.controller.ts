import { Controller, Get } from '@nestjs/common';
import * as Discoverer from '@/features/Discoverer/callKommo/_index';

@Controller('api/v1/discoverer-api/kommo/get-tags')
export class getTagsController {
  constructor() { }
  
  @Get()
  async getTags() {
    const tags = await Discoverer.getTags();

    return tags;
  }
}