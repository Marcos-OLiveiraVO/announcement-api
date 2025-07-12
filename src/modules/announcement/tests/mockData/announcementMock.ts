import { Announcement, ChannelType, Status } from '@announcement/application/entities/announcement';
import {
  CreateAnnouncementInput,
  GetAnnouncementsPaginated,
  UpdateAnnouncementInput,
} from '@announcement/application/interfaces/announcementRequest';

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
export const announcementEntityMockStatus = new Announcement({ ...announcementMock, status: Status.sent }, announcementId);
export const announcementEntityMockChannelType = new Announcement(
  { ...announcementMock, channelType: ChannelType.email },
  announcementId,
);

export const updateAnnouncementMock: UpdateAnnouncementInput = {
  id: 1,
  title: 'new title',
  content: 'new content',
  status: Status.sent,
};

export const announcementsDataMock: GetAnnouncementsPaginated = {
  status: Status.sent,
  channelType: ChannelType.slack,
  author: 'John Doe',
  startDate: new Date('2025-07-01T00:00:00Z'),
  endDate: new Date('2025-07-10T23:59:59Z'),
};
