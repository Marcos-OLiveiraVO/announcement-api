import { CreateAnnouncementUseCase } from '@announcement/application/use-cases/createAnnouncementUseCase';
import { CreateAnnouncementDTO } from '@announcement/infra/adapters/dtos/announcementDTO';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiResponse({ status: 409, description: 'Announcement already exists' })
@ApiTags('Announcements')
@ApiBearerAuth()
@Controller('comunicados')
export class CreateAnnouncementController {
  constructor(private createAnnouncement: CreateAnnouncementUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() data: CreateAnnouncementDTO): Promise<void> {
    await this.createAnnouncement.execute({
      ...data,
      sentAt: data.sentAt ? new Date(data.sentAt) : undefined,
    });
  }
}
