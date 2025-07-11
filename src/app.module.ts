import { AnnouncementModule } from '@announcement/announcement.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from '@shared/database/database.module';
import { HealthModule } from '@shared/infra/health/health.module';
import { AuthenticationGuard } from '@shared/middleware/auth/authentication.guard';
import { AuthenticationModule } from '@shared/middleware/auth/authentication.module';
import { CacheModule } from '@shared/services/cache/cache.module';
import { JsonPlaceHolderModule } from '@shared/services/jsonPlaceHolder/jsonPlaceHolder.module';
import { LoggerModule } from '@shared/services/logger/logger.module';

@Module({
  providers: [{ provide: APP_GUARD, useClass: AuthenticationGuard }],
  imports: [
    DatabaseModule,
    AnnouncementModule,
    JsonPlaceHolderModule,
    CacheModule,
    LoggerModule,
    HealthModule,
    AuthenticationModule,
  ],
})
export class AppModule {}
