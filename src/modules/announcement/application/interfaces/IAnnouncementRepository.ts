import { Pagination } from '@shared/utils/interfaces/globalInterface';
import { Announcement } from '../entities/announcement';
import { FindAnnouncementByTitleInput, GetAnnouncementsPaginated } from './announcementRequest';

export abstract class IAnnouncementRepository {
  abstract createAnnouncement(data: Announcement): Promise<void>;
  abstract updateAnnouncement(data: Announcement): Promise<Announcement>;
  abstract deleteAnnouncement(id: number): Promise<void>;
  abstract findAnnouncementByTitle(data: FindAnnouncementByTitleInput): Promise<boolean>;
  abstract findAnnouncementById(id: number): Promise<Announcement | null>;
  abstract findAllAnnouncements(data: GetAnnouncementsPaginated): Promise<Pagination<Announcement>>;
}
