import { Module } from '@nestjs/common';
import { ListenersModule } from './listeners/listeners.module';
import { LoggingModule } from './logging/logging.module';
import { RegistrationModule } from './listeners/registration/registration.module';
import { DemoModule } from './listeners/demo/demo.module';
import { StripeModule } from './listeners/stripe/stripe.module';
import { AddFakeApiModule } from './listeners/add-fake-api/add-fake-api.module';
import { DiscovererApiModule } from './discoverer-api/discoverer.module';

@Module({
  imports: [ListenersModule, LoggingModule,
    DemoModule,
    StripeModule, RegistrationModule, AddFakeApiModule, DiscovererApiModule],
  exports: [ListenersModule, LoggingModule,
    DemoModule,
    StripeModule, RegistrationModule, AddFakeApiModule, DiscovererApiModule],
})
  
export class V1Module {}
