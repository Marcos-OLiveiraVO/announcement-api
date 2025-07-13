import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/services/database/database.module';
import { CreateAnnouncementController } from './infra/http/controllers/createAnnouncementController';
import { CreateAnnouncementUseCase } from './application/use-cases/createAnnouncementUseCase';
import { GetAnnouncementController } from './infra/http/controllers/getAnnouncementController';
import { GetAnnouncementUseCase } from './application/use-cases/getAnnouncementUseCase';
import { GetAnnouncementsController } from './infra/http/controllers/getAnnouncementsController';
import { GetAnnouncementsUseCase } from './application/use-cases/getAnnouncementsUseCase';
import { UpdateAnnouncementController } from './infra/http/controllers/updateAnnouncementController';
import { UpdateAnnouncementUseCase } from './application/use-cases/updateAnnouncementUseCase';
import { IAnnouncementRepository } from './application/interfaces/IAnnouncementRepository';
import { AnnouncementRepository } from './infra/database/repositories/announcementRepository';
import { DeleteAnnouncementController } from './infra/http/controllers/deleteAnnouncementController';
import { DeleteAnnouncementUseCase } from './application/use-cases/deleteAnnouncementUseCase';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateAnnouncementUseCase,
    UpdateAnnouncementUseCase,
    DeleteAnnouncementUseCase,
    GetAnnouncementUseCase,
    GetAnnouncementsUseCase,
    { provide: IAnnouncementRepository, useClass: AnnouncementRepository },
  ],
  controllers: [
    CreateAnnouncementController,
    UpdateAnnouncementController,
    DeleteAnnouncementController,
    GetAnnouncementController,
    GetAnnouncementsController,
  ],
})
export class AnnouncementModule {}
