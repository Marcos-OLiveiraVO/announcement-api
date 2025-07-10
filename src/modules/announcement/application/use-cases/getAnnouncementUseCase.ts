import { Injectable } from '@nestjs/common';
import { IAnnouncementRepository } from '../interfaces/IAnnouncementRepository';
import { Announcement } from '../entities/announcement';

@Injectable()
export class GetAnnouncementUseCase {
  constructor(private announcementRepository: IAnnouncementRepository) {}

  async execute(id: number): Promise<Announcement | null> {
    return await this.announcementRepository.findAnnouncementById(id);
  }
}
