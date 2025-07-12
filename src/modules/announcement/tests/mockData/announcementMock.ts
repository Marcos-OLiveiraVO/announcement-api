import { Announcement, ChannelType, Status } from '@announcement/application/entities/announcement';
import { CreateAnnouncementInput } from '@announcement/application/interfaces/announcementRequest';

export const announcementMock: CreateAnnouncementInput = {
  title: 'title',
  author: 'John doe',
  content: 'content',
  channelType: ChannelType.slack,
  status: Status.draft,
  sentAt: new Date(),
};

export const findAnnouncementMock = {
  title: announcementMock.title,
  author: announcementMock.author,
};

export const announcementId = 1;
export const announcementEntityMock = new Announcement(announcementMock, announcementId);
