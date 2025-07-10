import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/database/database.module';
import { CreateAnnouncementController } from './infra/http/controllers/createAnnouncementController';
import { CreateAnnouncementUseCase } from './application/use-cases/createAnnouncementUseCase';

@Module({
  imports: [DatabaseModule],
  providers: [CreateAnnouncementUseCase],
  controllers: [CreateAnnouncementController],
})
export class AnnouncementModule {}
