import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { LoggingService } from './logging.service';

@Module({
  controllers: [LogsController],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
