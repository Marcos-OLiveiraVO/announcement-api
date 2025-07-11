import { Injectable } from '@nestjs/common';
import { ILoggerRepository } from '@shared/services/logger/application/interfaces/ILoggerRepository';
import { LoggerLevelInput } from '@shared/services/logger/application/interfaces/loggerRequest';
import { loggerFormatter } from '@shared/utils/functions/loggerFormatter';

@Injectable()
export class LoggerRepository implements ILoggerRepository {
  constructor() {}

  debug(data: LoggerLevelInput): void {
    console.debug(loggerFormatter({ ...data, level: 'debug' }));
  }

  info(data: LoggerLevelInput): void {
    console.info(loggerFormatter({ ...data, level: 'info' }));
  }

  warn(data: LoggerLevelInput): void {
    console.warn(loggerFormatter({ ...data, level: 'warn' }));
  }

  error(data: LoggerLevelInput): void {
    console.error(loggerFormatter({ ...data, level: 'error' }));
  }
}
