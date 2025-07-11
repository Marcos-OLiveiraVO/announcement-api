import { AnnouncementModule } from '@announcement/announcement.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/database/database.module';
import { CacheModule } from '@shared/services/cache/cache.module';
import { JsonPlaceHolderModule } from '@shared/services/jsonPlaceHolder/jsonPlaceHolder.module';

@Module({
  imports: [DatabaseModule, AnnouncementModule, JsonPlaceHolderModule, CacheModule],
})
export class AppModule {}
