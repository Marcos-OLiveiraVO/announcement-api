import { Injectable } from '@nestjs/common';
import { IAnnouncementRepository } from '../interfaces/IAnnouncementRepository';

@Injectable()
export class DeleteAnnouncementUseCase {
  constructor(private announcementRepository: IAnnouncementRepository) {}

  async execute(id: number): Promise<void> {
    await this.announcementRepository.deleteAnnouncement(id);
  }
}
