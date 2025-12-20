import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from '../api/v1/logging/logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const startTime = Date.now();

    console.log('🚀 INTERCEPTOR START - URL:', request.originalUrl, 'METHOD:', request.method);

    // Skip logging for dashboard-related requests to prevent endless loops
    const skipEndpoints = [
      '/api/v1/logs/stats',
      '/dashboard',
      '/favicon.ico',
      '/'
    ];

    // Only skip /api/v1/logs if it's a GET request (dashboard fetching logs)
    // Allow POST requests to /api/v1/logs (like the test endpoint)
    const shouldSkip = skipEndpoints.some(endpoint => 
      request.originalUrl.startsWith(endpoint)
    ) || (request.originalUrl.startsWith('/api/v1/logs') && request.method === 'GET');

    if (shouldSkip) {
      console.log('⏭️ SKIPPING LOG:', request.originalUrl);
      return next.handle();
    }

    console.log('🔍 Interceptor called for:', request.method, request.originalUrl);

    // Capture request body
    let requestBody: any = null;
    if (request.body && Object.keys(request.body).length > 0) {
      requestBody = request.body;
    }

    return next.handle().pipe(
      tap((responseBody) => {
        const duration = Date.now() - startTime;
        
        console.log('📝 Logging request:', request.method, request.originalUrl, response.statusCode, duration + 'ms');
        
        // Log the request
        this.loggingService.logRequest({
          method: request.method,
          endpoint: request.originalUrl,
          statusCode: response.statusCode,
          duration,
          ip: request.ip || request.connection.remoteAddress || 'unknown',
          userAgent: request.get('User-Agent'),
          requestBody,
          responseBody,
          headers: request.headers as Record<string, string>,
        });
      })
    );
  }
}
