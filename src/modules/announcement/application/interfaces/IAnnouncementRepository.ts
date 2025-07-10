import { Announcement } from '../entities/announcement';
import { FindAnnouncementByTitleInput } from './announcementRequest';

export abstract class IAnnouncementRepository {
  abstract createAnnouncement(announcement: Announcement): Promise<void>;
  abstract findAnnouncementByTitle(data: FindAnnouncementByTitleInput): Promise<boolean>;
  abstract findAnnouncementById(id: number): Promise<Announcement | null>;
}
