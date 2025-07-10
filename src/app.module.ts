import { AnnouncementModule } from '@announcement/announcement.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/database/database.module';

@Module({
  imports: [DatabaseModule, AnnouncementModule],
})
export class AppModule {}
