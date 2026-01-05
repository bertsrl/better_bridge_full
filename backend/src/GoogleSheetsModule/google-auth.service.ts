import { Injectable } from '@nestjs/common';
import { Auth, google } from 'googleapis';
import { GoogleOAuthStore } from '../GoogleAuthModule/authStore/googleOAuthStore';
import { getEnv } from 'PARENT_DIR/_shared/env';

@Injectable()
export class GoogleAuthService {
  private oauth2Client: Auth.OAuth2Client;

  getClient(): any | undefined {
  try {
    const env = getEnv();
    this.oauth2Client = new google.auth.OAuth2(
      env.OAUTH_GOOGLE_CLIENT_ID,
      env.OAUTH_GOOGLE_CLIENT_SECRET,
      'http://localhost:8080/oauth2callback',
    );
    
    // 🔑 Load stored tokens on startup
    const refreshToken = GoogleOAuthStore.getInstance().getRefreshToken();
    const accessToken = GoogleOAuthStore.getInstance().getAccessToken();
    
    // console.log("refreshToken: ", refreshToken);
    // console.log("accessToken: ", accessToken);

    // Only set credentials if we have at least a refresh token
    if (refreshToken) {
      this.oauth2Client.setCredentials({
        refresh_token: refreshToken,
        // Include access token if available (it will be refreshed automatically if expired)
        ...(accessToken && { access_token: accessToken }),
      });
    } else {
      // If no tokens, the client won't work - you might want to throw an error
      // or handle this case differently
      console.warn('No refresh token found. Please authenticate first via /auth');
    }

    // console.log('Google OAuth store refresh token:', refreshToken || 'NOT SET');
    // console.log('Google OAuth store access token:', accessToken || 'NOT SET');
    // console.log("oauth2Client: ", this.oauth2Client);

        return this.oauth2Client;
    } catch (error) {
        console.error("Error getting Google auth client: ", error);
        return undefined;
    }
  }
}