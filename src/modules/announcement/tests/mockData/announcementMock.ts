import { Announcement, ChannelType, Status } from '@announcement/application/entities/announcement';
import { CreateAnnouncementInput, UpdateAnnouncementInput } from '@announcement/application/interfaces/announcementRequest';

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

export const updateAnnouncementMock: UpdateAnnouncementInput = {
  id: 1,
  title: 'new title',
  content: 'new content',
  status: Status.sent,
};
