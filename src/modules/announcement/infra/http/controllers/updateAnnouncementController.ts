import { UpdateAnnouncementUseCase } from '@announcement/application/use-cases/updateAnnouncementUseCase';
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { AnnouncementViewModel } from '../viewModels/announcementViewModel';
import { UpdateAnnouncementDTO } from '@announcement/infra/adapters/dtos/announcementDTO';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiResponse({ status: 400, description: 'id is required' })
@ApiTags('Announcements')
@Controller('comunicados')
export class UpdateAnnouncementController {
  constructor(private updateAnnouncementUseCase: UpdateAnnouncementUseCase) {}

  @Put('/:id')
  @HttpCode(200)
  async handle(@Body() data: UpdateAnnouncementDTO, @Param('id') id: number): Promise<AnnouncementViewModel> {
    if (!id) {
      return new BadRequestException('id is required');
    }

    const announcement = await this.updateAnnouncementUseCase.execute({
      ...data,
      id,
      sentAt: data.sentAt ? new Date(data.sentAt) : undefined,
    });

    return announcement ? AnnouncementViewModel.toHttp(announcement) : HttpStatus.OK;
  }
}
