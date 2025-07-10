import { Announcement } from '@announcement/application/entities/announcement';
import { FindAnnouncementByTitleInput } from '@announcement/application/interfaces/announcementRequest';
import { IAnnouncementRepository } from '@announcement/application/interfaces/IAnnouncementRepository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prismaService';

@Injectable()
export class AnnouncementRepository implements IAnnouncementRepository {
  constructor(private prisma: PrismaService) {}

  async createAnnouncement(announcement: Announcement): Promise<void> {
    await this.prisma.announcement.create({ data: announcement });
  }

  async findAnnouncementByTitle(data: FindAnnouncementByTitleInput): Promise<boolean> {
    const announcementExists = await this.prisma.announcement.findFirst({
      where: { title: data.title, author: data.author },
    });

    return announcementExists ? true : false;
  }
}
