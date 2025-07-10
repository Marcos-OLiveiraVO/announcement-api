import { Announcement as AnnouncementEntity, ChannelType, Status } from '@announcement/application/entities/announcement';
import { announcement as announcementModel, Prisma } from '@prisma/client';

export class AnnouncementMapper {
  static toDomain(model: announcementModel): AnnouncementEntity {
    return new AnnouncementEntity(
      {
        author: model.author,
        title: model.title,
        content: model.content,
        channelType: model.channelType as ChannelType,
        status: model.status as Status,
        sentAt: model.sentAt!,
        createdAt: model.createdAt!,
        deletedAt: model.deletedAt!,
      },
      model.id,
    );
  }
  static toDatabase(entity: AnnouncementEntity): Prisma.announcementUncheckedCreateInput {
    return {
      id: entity.id,
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
