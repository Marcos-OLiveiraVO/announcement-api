import { AnnouncementModule } from '@announcement/announcement.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/database/database.module';
import { HealthModule } from '@shared/infra/health/health.module';
import { CacheModule } from '@shared/services/cache/cache.module';
import { JsonPlaceHolderModule } from '@shared/services/jsonPlaceHolder/jsonPlaceHolder.module';
import { LoggerModule } from '@shared/services/logger/logger.module';

@Module({
  imports: [DatabaseModule, AnnouncementModule, JsonPlaceHolderModule, CacheModule, LoggerModule, HealthModule],
})
export class AppModule {}
