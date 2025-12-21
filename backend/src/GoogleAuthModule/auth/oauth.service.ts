import { Injectable } from '@nestjs/common';
import { google, Auth } from 'googleapis';
import { getEnv } from 'PARENT_DIR/_shared/env';

@Injectable()
export class GoogleOAuthService {
  private oauth2Client: Auth.OAuth2Client;

  private readonly SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.readonly',
  ];

  constructor() {
    const env = getEnv();
    this.oauth2Client = new google.auth.OAuth2(
      env.OAUTH_GOOGLE_CLIENT_ID,
      env.OAUTH_GOOGLE_CLIENT_SECRET,
      'http://localhost:8080/oauth2callback',
    );
  }

  getAuthUrl(): string {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline', // IMPORTANT
      scope: this.SCOPES,
      prompt: 'consent',
    });
  }

  async getTokens(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);
    return tokens;
  }

  setCredentials(tokens: Auth.Credentials) {
    this.oauth2Client.setCredentials(tokens);
  }

  getClient(): Auth.OAuth2Client {
    return this.oauth2Client;
  }
}
