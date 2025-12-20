import { Injectable, Logger } from '@nestjs/common';

export interface ApiLog {
  id: string;
  timestamp: Date;
  method: string;
  endpoint: string;
  statusCode: number;
  duration: number;
  ip: string;
  userAgent?: string;
  requestBody?: any;
  responseBody?: any;
  headers?: Record<string, string>;
  error?: string;
}

// Global variable to store logs across all instances
const globalLogs: ApiLog[] = [];
const MAX_LOGS = 1000;

@Injectable()
export class LoggingService {
  private readonly logger = new Logger(LoggingService.name);

  logRequest(log: Omit<ApiLog, 'id' | 'timestamp'>): void {
    console.log('🔄 LoggingService.logRequest called:', log.method, log.endpoint);
    
    const apiLog: ApiLog = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      ...log,
    };

    globalLogs.unshift(apiLog); // Add to beginning for newest first
    
    // Keep only the last maxLogs
    if (globalLogs.length > MAX_LOGS) {
      globalLogs.splice(MAX_LOGS);
    }

    console.log('📊 Total logs now:', globalLogs.length, 'Latest log:', log.endpoint);

    // Log to console as well
    this.logger.log(`${log.method} ${log.endpoint} - ${log.statusCode} (${log.duration}ms)`);
    
    if (log.requestBody) {
      this.logger.debug('Request Body:', JSON.stringify(log.requestBody, null, 2));
    }
    
    if (log.error) {
      this.logger.error('Error:', log.error);
    }
  }

  getLogs(limit: number = 100): ApiLog[] {
    console.log('📋 getLogs called, returning', globalLogs.length, 'logs');
    return globalLogs.slice(0, limit);
  }

  getLogsByEndpoint(endpoint: string, limit: number = 50): ApiLog[] {
    return globalLogs
      .filter(log => log.endpoint.includes(endpoint))
      .slice(0, limit);
  }

  clearLogs(): void {
    globalLogs.length = 0;
  }

  getStats(): {
    totalRequests: number;
    requestsByMethod: Record<string, number>;
    requestsByEndpoint: Record<string, number>;
    averageResponseTime: number;
    errorRate: number;
  } {
    const totalRequests = globalLogs.length;
    const requestsByMethod: Record<string, number> = {};
    const requestsByEndpoint: Record<string, number> = {};
    let totalDuration = 0;
    let errorCount = 0;

    globalLogs.forEach(log => {
      requestsByMethod[log.method] = (requestsByMethod[log.method] || 0) + 1;
      requestsByEndpoint[log.endpoint] = (requestsByEndpoint[log.endpoint] || 0) + 1;
      totalDuration += log.duration;
      if (log.statusCode >= 400) {
        errorCount++;
      }
    });

    return {
      totalRequests,
      requestsByMethod,
      requestsByEndpoint,
      averageResponseTime: totalRequests > 0 ? totalDuration / totalRequests : 0,
      errorRate: totalRequests > 0 ? (errorCount / totalRequests) * 100 : 0,
    };
  }
}
