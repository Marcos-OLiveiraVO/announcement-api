import { Injectable } from '@nestjs/common';
import { IAnnouncementRepository } from '../interfaces/IAnnouncementRepository';
import { Announcement } from '../entities/announcement';
import { GetAnnouncementsPaginated } from '../interfaces/announcementRequest';
import { Pagination } from '@shared/utils/interfaces/globalInterface';

@Injectable()
export class GetAnnouncementsUseCase {
  constructor(private announcementRepository: IAnnouncementRepository) {}

  async execute(data: GetAnnouncementsPaginated): Promise<Pagination<Announcement>> {
    return await this.announcementRepository.findAllAnnouncements(data);
  }
}
