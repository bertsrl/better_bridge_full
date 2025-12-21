import { Module } from '@nestjs/common';
import { AddFakeApiController } from './add-fake-api.controller';
import { AddFakeApiService } from './add-fake-api.service';

@Module({
  imports: [],
  controllers: [AddFakeApiController],
  providers: [AddFakeApiService],
  exports: [AddFakeApiService],
})
export class AddFakeApiModule {}