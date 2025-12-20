import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DemoService } from "./demo.service";

@Controller('api/v1/listeners/demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('rawRequest'))
  async createDemo(@Body() body: any, @UploadedFile() file: any) {
    console.log('🔍 DemoController.createDemo called:', body);
    console.log('📁 File:', file);
    
    // Get the rawRequest from either the file buffer or body
    const rawRequest = file ? file.buffer.toString() : body.rawRequest;
    return this.demoService.createDemo(rawRequest);
  }
}