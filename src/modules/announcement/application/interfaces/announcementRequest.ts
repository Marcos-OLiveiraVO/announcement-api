import { ChannelType, Status } from '../entities/announcement';

export interface CreateAnnouncementInput {
  author: string;
  title: string;
  content: string;
  channelType: ChannelType;
  status: Status;
  sentAt?: Date;
}

export interface FindAnnouncementByTitleInput {
  author: string;
  title: string;
}
