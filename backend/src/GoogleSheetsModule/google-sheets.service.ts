import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { GoogleAuthService } from './google-auth.service';

@Injectable()
export class GoogleSheetsService {
  private sheets;

  constructor(private readonly authService: GoogleAuthService) {
    try {
      const googleAuthClient = this.authService.getClient();
      console.log('googleAuthClient: ', googleAuthClient);
    } catch (error) {
      console.error('Error getting Google auth client: ', error);
      return undefined;
    }
  }

  async getAllRows(
    spreadsheetId: string,
    range = 'Sheet1', // default
  ) {
    try {
      //   const googleAuthClient = this.authService.getClient();
      //   console.log('googleAuthClient: ', googleAuthClient);

      //   this.sheets = google.sheets({
      //     version: 'v4',
      //     auth: googleAuthClient,
      //   });

      //   const response = await this.sheets.spreadsheets.values.get({
      //     spreadsheetId,
      //     range,
      //   });

      //   return response.data.values || [];
      const sheets = google.sheets({
        version: 'v4',
        auth: this.authService.getClient(),
      });

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      const rows = response.data.values;
      if (!rows || rows.length === 0) {
        return [];
      }

      // First row is headers
      const headers = rows[0];
      const dataRows = rows.slice(1);

      // Map each row to an object
      const result = dataRows.map((row) => {
        const obj: Record<string, any> = {};
        headers.forEach((header, i) => {
          obj[header] = row[i] ?? null; // handle empty cells
        });
        return obj;
      });

      return result;
    } catch (error) {
      console.error('Error getting Google Sheets data: ', error);
      return []; // Return empty array instead of undefined
    }
  }
}
