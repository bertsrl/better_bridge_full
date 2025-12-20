import { Module } from '@nestjs/common';
import { ListenersController } from './listeners.controller';
import { ListenersService } from './listeners.service';
import { LoggingService } from '../logging/logging.service';

@Module({
  controllers: [ListenersController],
  providers: [ListenersService, LoggingService],
  exports: [ListenersService],
})
export class ListenersModule {}
