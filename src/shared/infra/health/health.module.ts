import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/services/database/database.module';
import { CheckDBController } from './checkDBController';
import { CheckCacheController } from './checkCacheController';
import { CacheModule } from '@shared/services/cache/cache.module';
import { LoggerModule } from '@shared/services/logger/logger.module';
import { ILoggerRepository } from '@shared/services/logger/application/interfaces/ILoggerRepository';
import { LoggerRepository } from '@shared/services/logger/infra/database/repositories/loggerRepository';

@Module({
  imports: [DatabaseModule, CacheModule, LoggerModule],
  providers: [{ provide: ILoggerRepository, useClass: LoggerRepository }],
  controllers: [CheckDBController, CheckCacheController],
})
export class HealthModule {}
