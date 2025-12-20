import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GoogleOAuthService } from './oauth.service';
import { GoogleOAuthStore } from '../authStore/googleOAuthStore';

@Controller()
export class GoogleOAuthController {
  constructor(private readonly googleOAuthService: GoogleOAuthService) {}

  /**
   * Step 1: Redirect user to Google consent screen
   */
  @Get('auth')
  auth(@Res() res: Response) {
    const url = this.googleOAuthService.getAuthUrl();
    return res.redirect(url);
  }

  /**
   * Step 2: Google redirects here with ?code=
   */
  @Get('oauth2callback')
  async oauthCallback(
    @Query('code') code: string,
    @Res() res: Response,
  ) {
    if (!code) {
      return res.status(400).send('Missing authorization code');
    }

    const tokens = await this.googleOAuthService.getTokens(code);

    /**
     * TODO:
     * - Encrypt tokens
     * - Store in DB / Secrets Manager
     */
    console.log('OAuth tokens:', tokens);

    // store tokens in store
    GoogleOAuthStore.getInstance().setAccessToken(tokens.access_token);
    GoogleOAuthStore.getInstance().setRefreshToken(tokens.refresh_token);
    

    // print store tokens
    // console.log('Google OAuth store refresh token:', GoogleOAuthStore.getInstance().getRefreshToken());
    // console.log('Google OAuth store access token:', GoogleOAuthStore.getInstance().getAccessToken());

    return res.send('Google authentication successful');
  }
}
