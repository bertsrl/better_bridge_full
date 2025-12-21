import { Module } from '@nestjs/common';
import { getCustomFieldsController } from './kommo/get-custom-fields.controller';
import { getPipelinesController } from './kommo/get-pipelines.controller';
import { getTagsController } from './kommo/get-tags.controller';


@Module({
  imports: [],
  controllers: [getCustomFieldsController, getPipelinesController, getTagsController],
  providers: [],
  exports: [],
})
export class DiscovererApiModule {}