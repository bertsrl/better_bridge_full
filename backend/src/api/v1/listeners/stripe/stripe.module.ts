import { Module } from '@nestjs/common';
import StripeControllers from './stripe.controller';
import { StripeService } from './stripe.service';

@Module({
  imports: [],
  controllers: StripeControllers,
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}