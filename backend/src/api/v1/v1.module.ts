import { Module } from '@nestjs/common';
import { ListenersModule } from './listeners/listeners.module';
import { LoggingModule } from './logging/logging.module';
import { RegistrationModule } from './listeners/registration/registration.module';
import { DemoModule } from './listeners/demo/demo.module';
import { StripeModule } from './listeners/stripe/stripe.module';

@Module({
  imports: [ListenersModule, LoggingModule,
    DemoModule,
    StripeModule, RegistrationModule],
  exports: [ListenersModule, LoggingModule,
    DemoModule,
    StripeModule, RegistrationModule],
})
  
export class V1Module {}
