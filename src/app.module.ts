import { AnnouncementModule } from '@announcement/announcement.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from '@shared/database/database.module';
import { HealthModule } from '@shared/infra/health/health.module';
import { AuthenticationModule } from '@shared/middleware/auth/authentication.module';
import { AuthenticationGuard } from '@shared/middleware/auth/infra/http/guards/authentication.guard';
import { CacheModule } from '@shared/services/cache/cache.module';
import { JsonPlaceHolderModule } from '@shared/services/jsonPlaceHolder/jsonPlaceHolder.module';
import { LoggerModule } from '@shared/services/logger/logger.module';

@Module({
  providers: [
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
  imports: [
    DatabaseModule,
    AnnouncementModule,
    JsonPlaceHolderModule,
    CacheModule,
    LoggerModule,
    HealthModule,
    AuthenticationModule,
    ThrottlerModule.forRoot({ throttlers: [{ ttl: seconds(60), limit: 45 }] }),
  ],
})
export class AppModule {}
