import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/database/database.module';
import { CreateAnnouncementController } from './infra/http/controllers/createAnnouncementController';
import { CreateAnnouncementUseCase } from './application/use-cases/createAnnouncementUseCase';
import { GetAnnouncementController } from './infra/http/controllers/getAnnouncementController';
import { GetAnnouncementUseCase } from './application/use-cases/getAnnouncementUseCase';

@Module({
  imports: [DatabaseModule],
  providers: [CreateAnnouncementUseCase, GetAnnouncementUseCase],
  controllers: [CreateAnnouncementController, GetAnnouncementController],
})
export class AnnouncementModule {}
