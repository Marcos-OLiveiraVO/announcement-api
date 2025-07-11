import { Announcement } from '@announcement/application/entities/announcement';
import { IAnnouncementRepository } from '@announcement/application/interfaces/IAnnouncementRepository';
import { Pagination } from '@shared/utils/interfaces/globalInterface';
import {
  FindAnnouncementByTitleInput,
  GetAnnouncementsPaginated,
} from '@announcement/application/interfaces/announcementRequest';

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

  findAllAnnouncements(data: GetAnnouncementsPaginated): Promise<Pagination<Announcement>> {
    throw new Error('Method not implemented.');
  }
}
