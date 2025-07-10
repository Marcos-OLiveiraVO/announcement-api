import { Announcement } from '@announcement/application/entities/announcement';
import { AnnouncementViewModelOutput } from '@announcement/application/interfaces/announcementRequest';

export class AnnouncementViewModel {
  static toHttp(entity: Announcement): AnnouncementViewModelOutput {
    return {
      id: entity.id!,
      author: entity.author,
      title: entity.title,
      content: entity.content,
      channelType: entity.channelType,
      status: entity.status,
      sentAt: entity.sentAt,
      createdAt: entity.createdAt,
      deletedAt: entity.deletedAt,
    };
  }
}
