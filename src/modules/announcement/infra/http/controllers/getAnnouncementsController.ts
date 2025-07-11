import { GetAnnouncementsUseCase } from '@announcement/application/use-cases/getAnnouncementsUseCase';
import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { AnnouncementViewModel } from '../viewModels/announcementViewModel';
import { Pagination } from '@shared/utils/interfaces/globalInterface';
import { GetAnnouncementsPaginatedDTO } from '@announcement/infra/adapters/dtos/announcementDTO';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Announcements')
@Controller('comunicados')
export class GetAnnouncementsController {
  constructor(private getAnnouncementsUseCase: GetAnnouncementsUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@Query() data: GetAnnouncementsPaginatedDTO): Promise<Pagination<AnnouncementViewModel>> {
    const announcements = await this.getAnnouncementsUseCase.execute({
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    });

    if (announcements.data.length === 0) {
      return {
        data: [],
        metadata: announcements.metadata,
      };
    }

    return {
      data: announcements.data.map(announcement => AnnouncementViewModel.toHttp(announcement)),
      metadata: announcements.metadata,
    };
  }
}
