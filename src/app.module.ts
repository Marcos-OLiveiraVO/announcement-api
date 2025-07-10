import { AnnouncementModule } from '@announcement/announcement.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/database/database.module';
import { JsonPlaceHolderModule } from '@shared/services/jsonPlaceHolder/jsonPlaceHolder.module';

@Module({
  imports: [DatabaseModule, AnnouncementModule, JsonPlaceHolderModule],
})
export class AppModule {}
