import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('dashboard')
export class DashboardController {
  @Get()
  serveDashboard(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', 'public', 'dashboard.html'));
  }
}
