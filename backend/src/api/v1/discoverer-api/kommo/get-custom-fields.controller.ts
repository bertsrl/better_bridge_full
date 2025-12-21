import { Controller, Get } from '@nestjs/common';
import * as Discoverer from '@/features/Discoverer/callKommo/_index';

@Controller('api/v1/discoverer-api/kommo/get-custom-fields')
export class getCustomFieldsController {
  constructor() { }
  
  @Get()
  async getCustomFields() {
    const customFields = await Discoverer.getCustomFields();

    return customFields;
  }
}