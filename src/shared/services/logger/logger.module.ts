import { Module } from '@nestjs/common';
import { ILoggerRepository } from './application/interfaces/ILoggerRepository';
import { LoggerRepository } from './infra/database/repositories/loggerRepository';

@Module({
  providers: [{ provide: ILoggerRepository, useClass: LoggerRepository }],
  exports: [{ provide: ILoggerRepository, useClass: LoggerRepository }],
})
export class LoggerModule {}
