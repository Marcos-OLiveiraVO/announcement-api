import { BasePagination } from '@shared/utils/interfaces/globalInterface';
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

export interface AnnouncementViewModelOutput {
  id: number;
  author: string;
  title: string;
  content: string;
  channelType: string;
  status: string;
  sentAt: Date | undefined;
  createdAt: Date | undefined;
  deletedAt: Date | undefined;
}

export interface GetAnnouncementsPaginated extends BasePagination {
  status?: Status;
  channelType?: ChannelType;
  author?: string;
  startDate?: Date;
  endDate?: Date;
}
