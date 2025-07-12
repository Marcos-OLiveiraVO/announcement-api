import { Announcement } from '@announcement/application/entities/announcement';
import { IAnnouncementRepository } from '@announcement/application/interfaces/IAnnouncementRepository';
import { Pagination } from '@shared/utils/interfaces/globalInterface';
import {
  FindAnnouncementByTitleInput,
  GetAnnouncementsPaginated,
} from '@announcement/application/interfaces/announcementRequest';
import { paginate, paginationSkipItens } from '@shared/utils/functions/paginate';

export class AnnouncementInMemoryRepository implements IAnnouncementRepository {
  private announcement = new Map<number, Announcement>();

  async createAnnouncement(data: Announcement): Promise<void> {
    const ids = [...this.announcement.keys()];
    const id = ids.length > 0 ? Math.max(...ids) + 1 : 1;

    this.announcement.set(id, data);
  }

  async updateAnnouncement(data: Announcement): Promise<Announcement> {
    const announcement = this.announcement.get(data.id!);
    const announcementWithUpdatedData = Object.assign(announcement!, data);

    const announcementUpdated = this.announcement.set(data.id!, announcementWithUpdatedData).get(data.id!);

    return announcementUpdated!;
  }

  async deleteAnnouncement(id: number): Promise<void> {
    const announcement = this.announcement.get(id);
    const announcementWithDeletedAt = Object.assign(announcement!, { deletedAt: new Date() });

    this.announcement.set(id, announcementWithDeletedAt);
  }

  async findAnnouncementByTitle(data: FindAnnouncementByTitleInput): Promise<boolean> {
    const announcement = Array.from(this.announcement.values()).find(
      announcement => announcement.title === data.title && announcement.author === data.author,
    );

    return announcement ? true : false;
  }

  async findAnnouncementById(id: number): Promise<Announcement | null> {
    const announcement = this.announcement.get(id);

    return announcement ? announcement : null;
  }

  async findAllAnnouncements(data: GetAnnouncementsPaginated): Promise<Pagination<Announcement>> {
    const limit = data.limit ?? 10;
    const page = data.page ?? 1;
    const itemsToSkip = paginationSkipItens(page, limit);

    const announcementsArray = Array.from(this.announcement.values());

    const filtered = announcementsArray.filter(announcement => {
      if (data.author && announcement.author !== data.author) return false;
      if (data.channelType && announcement.channelType !== data.channelType) return false;
      if (data.status && announcement.status !== data.status) return false;

      if (data.startDate && announcement.createdAt && announcement.createdAt < data.startDate) return false;
      if (data.endDate && announcement.createdAt && announcement.createdAt > data.endDate) return false;

      return true;
    });

    const paginated = filtered.slice(itemsToSkip, itemsToSkip + limit);
    const totalPages = paginate(filtered.length, limit);

    return {
      data: paginated,
      metadata: {
        currentPage: page,
        limitPerPage: limit,
        totalItems: filtered.length,
        totalPages,
        totalItemsOnThisPage: paginated.length,
      },
    };
  }
}
