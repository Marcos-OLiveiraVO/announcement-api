import { GetAnnouncementUseCase } from '@announcement/application/use-cases/getAnnouncementUseCase';
import { AnnouncementViewModel } from '../viewModels/announcementViewModel';
import { BadRequestException, Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiResponse({ status: 400, description: 'id is required' })
@ApiTags('Announcements')
@Controller('/comunicados')
export class GetAnnouncementController {
  constructor(private getAnnouncementUseCase: GetAnnouncementUseCase) {}

  @Get('/:id')
  @HttpCode(200)
  async handle(@Param('id') id: number): Promise<AnnouncementViewModel | null> {
    if (!id) {
      return new BadRequestException('id is required');
    }

    const announcement = await this.getAnnouncementUseCase.execute(id);

    return announcement ? AnnouncementViewModel.toHttp(announcement) : null;
  }
}
