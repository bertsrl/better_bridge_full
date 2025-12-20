import { Controller, Get, Query, Delete, Post } from '@nestjs/common';
import { LoggingService } from './logging.service';

@Controller('api/v1/logs')
export class LogsController {
  constructor(private readonly loggingService: LoggingService) {}

  @Get()
  async getLogs(@Query('limit') limit?: string, @Query('endpoint') endpoint?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 100;
    
    if (endpoint) {
      return this.loggingService.getLogsByEndpoint(endpoint, limitNum);
    }
    
    return this.loggingService.getLogs(limitNum);
  }

  @Get('stats')
  async getStats() {
    return this.loggingService.getStats();
  }

  @Delete()
  async clearLogs() {
    this.loggingService.clearLogs();
    return { message: 'Logs cleared successfully' };
  }

  @Post('test')
  async testLogging() {
    // Manually log a test request
    this.loggingService.logRequest({
      method: 'POST',
      endpoint: '/api/v1/logs/test',
      statusCode: 200,
      duration: 50,
      ip: '127.0.0.1',
      userAgent: 'Test Agent',
      requestBody: { test: true },
      responseBody: { message: 'Test logged successfully' },
      headers: { 'content-type': 'application/json' },
    });
    
    console.log('📝 Test log created, total logs:', this.loggingService.getLogs().length);
    
    return { message: 'Test log created successfully' };
  }
}
