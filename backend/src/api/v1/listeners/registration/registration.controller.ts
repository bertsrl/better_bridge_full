import { Controller, Post, Body, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegistrationService } from "./registration.service";

@Controller('api/v1/registration/:pathParam')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  @UseInterceptors(FileInterceptor('rawRequest'))
  async createCustomAPI(@Param('pathParam') pathParam: string, @Body() body: any, @UploadedFile() file: any) {
    console.log('🔍 CustomAPIController.createCustomAPI called:', body);
    console.log('📁 File:', file);

    // Get the rawRequest from either the file buffer or body
    const rawRequest = file ? file.buffer.toString() : body.rawRequest;
    return this.registrationService.register(pathParam, rawRequest);
  }
}