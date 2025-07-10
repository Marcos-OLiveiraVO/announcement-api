import { DeleteAnnouncementUseCase } from '@announcement/application/use-cases/deleteAnnouncementUseCase';
import { BadRequestException, Controller, Delete, HttpCode, Param } from '@nestjs/common';

@Controller('comunicados')
export class DeleteAnnouncementController {
  constructor(private deleteAnnouncement: DeleteAnnouncementUseCase) {}

  @HttpCode(204)
  @Delete('/:id')
  async execute(@Param('id') id: number): Promise<void> {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    return await this.deleteAnnouncement.execute(id);
  }
}
