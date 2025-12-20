import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { LoggingService } from './api/v1/logging/logging.service';
import { DashboardController } from './dashboard.controller';
import { GoogleOAuthController } from './GoogleAuthModule/auth/oauth.controller';
import { GoogleOAuthService } from './GoogleAuthModule/auth/oauth.service';
import { GoogleSheetsService } from './GoogleSheetsModule/google-sheets.service';
import { GoogleSheetsController } from './GoogleSheetsModule/google-sheets.controller';
import { GoogleAuthService } from './GoogleSheetsModule/google-auth.service';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '..', '.env'),
    }),
    ApiModule
  ],
  controllers: [
    AppController, DashboardController,
    GoogleOAuthController, GoogleSheetsController],
  providers: [
    AppService, 
    LoggingService,
    GoogleOAuthService,
    GoogleAuthService,
    GoogleSheetsService,
  ],
  exports: [LoggingService, GoogleOAuthService], // Export LoggingService so it can be used by the interceptor
})

export class AppModule { }
