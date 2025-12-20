import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseInterceptors } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';
import { LoggingInterceptor } from '../../../interceptors/logging.interceptor';
import { LoggingService } from '../logging/logging.service';

@Controller('api/v1/listeners')
@UseInterceptors(LoggingInterceptor)
export class ListenersController {
  constructor(
    private readonly listenersService: ListenersService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get()
  async getAllListeners(@Query() query: any) {
    return this.listenersService.getAllListeners(query);
  }

  @Get(':id')
  async getListenerById(@Param('id') id: string) {
    return this.listenersService.getListenerById(id);
  }

  @Post()
  async createListener(@Body() createListenerDto: CreateListenerDto) {
    return this.listenersService.createListener(createListenerDto);
  }

  @Put(':id')
  async updateListener(
    @Param('id') id: string,
    @Body() updateListenerDto: UpdateListenerDto,
  ) {
    return this.listenersService.updateListener(id, updateListenerDto);
  }

  @Delete(':id')
  async deleteListener(@Param('id') id: string) {
    return this.listenersService.deleteListener(id);
  }

  // Custom endpoint examples
  @Post(':id/activate')
  async activateListener(@Param('id') id: string) {
    return this.listenersService.activateListener(id);
  }

  @Post(':id/deactivate')
  async deactivateListener(@Param('id') id: string) {
    return this.listenersService.deactivateListener(id);
  }

  @Get(':id/status')
  async getListenerStatus(@Param('id') id: string) {
    return this.listenersService.getListenerStatus(id);
  }

  // Webhook test endpoint
  @Post('webhook/test')
  async testWebhook(@Body() payload: any) {
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Manually log this request
    console.log('🧪 Manual test webhook called with payload:', payload);
    
    // Manually log to LoggingService
    this.loggingService.logRequest({
      method: 'POST',
      endpoint: '/api/v1/listeners/webhook/test',
      statusCode: 201,
      duration: 100,
      ip: '127.0.0.1',
      userAgent: 'curl/8.14.1',
      requestBody: payload,
      responseBody: {
        message: 'Webhook received successfully',
        receivedAt: new Date().toISOString(),
        payload: payload,
        processed: true
      },
      headers: { 'content-type': 'application/json' },
    });
    
    return {
      message: 'Webhook received successfully',
      receivedAt: new Date().toISOString(),
      payload: payload,
      processed: true
    };
  }

  // Manual test endpoint
  @Post('test-log')
  async testLog(@Body() payload: any) {
    console.log('🧪 Manual test log endpoint called');
    return { message: 'Test log endpoint called' };
  }
}
