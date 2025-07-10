import { Injectable } from '@nestjs/common';
import { IAnnouncementRepository } from '../interfaces/IAnnouncementRepository';
import { UpdateAnnouncementInput } from '../interfaces/announcementRequest';
import { Announcement } from '../entities/announcement';

@Injectable()
export class UpdateAnnouncementUseCase {
  constructor(private announcementRepository: IAnnouncementRepository) {}

  async execute(data: UpdateAnnouncementInput): Promise<Announcement | null> {
    const announcementExits = await this.announcementRepository.findAnnouncementById(data.id);

    if (!announcementExits) {
      return null;
    }

    const announcement = new Announcement(data as Announcement);

    return await this.announcementRepository.updateAnnouncement(announcement);
  }
}
