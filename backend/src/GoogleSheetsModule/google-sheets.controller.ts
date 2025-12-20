import { Controller, Get, Param, Query } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';

@Controller('sheets')
export class GoogleSheetsController {
  constructor(private readonly googleSheetsService: GoogleSheetsService) {}

  /**
   * Example:
   * GET /sheets/1abcDEF123?range=Sheet1!A1:Z
   */
  @Get(':spreadsheetId')
  async getSheetData(
    @Param('spreadsheetId') spreadsheetId: string,
    @Query('range') range?: string,
  ) {
    const data = await this.googleSheetsService.getAllRows(
      spreadsheetId,
      range,
    );

    return {
      spreadsheetId,
      rows: data || [],
      count: data?.length || 0, // Safe access with optional chaining
    };
  }
}
