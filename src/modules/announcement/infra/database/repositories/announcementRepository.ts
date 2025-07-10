import { Announcement } from '@announcement/application/entities/announcement';
import { IAnnouncementRepository } from '@announcement/application/interfaces/IAnnouncementRepository';
import { AnnouncementMapper } from '@announcement/infra/adapters/mappers/announcementMapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prismaService';
import { paginate, paginationSkipItens } from '@shared/utils/functions/paginate';
import { Pagination } from '@shared/utils/interfaces/globalInterface';
import {
  FindAnnouncementByTitleInput,
  GetAnnouncementsPaginated,
} from '@announcement/application/interfaces/announcementRequest';

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

  async findAnnouncementById(id: number): Promise<Announcement | null> {
    const announcement = await this.prisma.announcement.findUnique({ where: { id } });

    if (!announcement) {
      return null;
    }

    return AnnouncementMapper.toDomain(announcement);
  }

  async findAllAnnouncements(data: GetAnnouncementsPaginated): Promise<Pagination<Announcement>> {
    const limit = data.limit ?? 10;
    const page = data.page ?? 1;

    const itemsToSkip = paginationSkipItens(page, limit);

    const filters = {
      channelType: data.channelType,
      status: data.status,
      author: data.author,
      createdAt: { gte: data.startDate, lte: data.endDate },
    };

    const announcementsQuantity = await this.prisma.announcement.count({ where: filters });

    const announcements = await this.prisma.announcement.findMany({
      where: filters,
      skip: itemsToSkip,
      take: limit,
    });

    const totalPages = paginate(announcementsQuantity, limit);
    const announcementDomain = announcements.map(announcement => AnnouncementMapper.toDomain(announcement));

    return {
      data: announcementDomain,
      metadata: {
        currentPage: page,
        limitPerPage: limit,
        totalItems: announcementsQuantity,
        totalPages: totalPages,
        totalItemsOnThisPage: announcementDomain.length,
      },
    };
  }
}
