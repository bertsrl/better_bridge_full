import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('api/v1/listeners/stripe/new-payment-intent')
class BetePFAStripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post() 
  async handleStripeEvent(@Body() body: any) {
    // For now, just echo back the received JSON
    console.log('🔍 stripe webhook body: ', JSON.stringify(body, null, 2));

    await this.stripeService.getBetePFAStripeIntent(body);
    // return { body };
  }
}

export default [BetePFAStripeController];