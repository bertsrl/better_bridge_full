import { Controller, Post } from '@nestjs/common';
import { AddFakeApiService } from './add-fake-api.service';

@Controller('api/v1/add-fake-api')
export class AddFakeApiController {
  constructor(private readonly addFakeApiService: AddFakeApiService) {}

  @Post()
  async addFakeApi() {
    return this.addFakeApiService.addFakeApi();
  }
}