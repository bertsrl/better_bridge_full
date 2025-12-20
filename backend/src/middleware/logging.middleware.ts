import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from '../api/v1/logging/logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    // Capture request body
    let requestBody: any = null;
    if (req.body && Object.keys(req.body).length > 0) {
      requestBody = req.body;
    }

    // Listen for response finish event
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      
      // Log the request
      this.loggingService.logRequest({
        method: req.method,
        endpoint: req.originalUrl,
        statusCode: res.statusCode,
        duration,
        ip: req.ip || req.connection.remoteAddress || 'unknown',
        userAgent: req.get('User-Agent'),
        requestBody,
        responseBody: null, // We can't easily capture response body this way
        headers: req.headers as Record<string, string>,
      });
    });

    next();
  }
}
