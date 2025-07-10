import { ConflictException, Injectable } from '@nestjs/common';
import { Announcement } from '../entities/announcement';
import { CreateAnnouncementInput } from '../interfaces/announcementRequest';
import { IAnnouncementRepository } from '../interfaces/IAnnouncementRepository';

@Injectable()
export class CreateAnnouncementUseCase {
  constructor(private announcementRepository: IAnnouncementRepository) {}

  async execute(data: CreateAnnouncementInput): Promise<void> {
    const announcementExists = await this.announcementRepository.findAnnouncementByTitle({
      title: data.title,
      author: data.author,
    });

    if (announcementExists) {
      throw new ConflictException('Announcement already exists');
    }

    const announcement = new Announcement(data);

    await this.announcementRepository.createAnnouncement(announcement);
  }
}
