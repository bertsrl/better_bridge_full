import { Injectable } from '@nestjs/common';
import { google, Auth } from 'googleapis';
import clientSecret from './client_secret_oauth.com.json';

@Injectable()
export class GoogleOAuthService {
  private oauth2Client: Auth.OAuth2Client;

  private readonly SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.readonly',
  ];

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      clientSecret.web.client_id,
      clientSecret.web.client_secret,
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
