import { ChannelType, Status } from '@announcement/application/entities/announcement';
import { IsString, IsEnum, IsISO8601, IsNotEmpty, Length, Matches } from 'class-validator';

export const strictDateTimeWithTimezoneRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?(Z|[+-]\d{2}:\d{2})$/;

export class CreateAnnouncementDTO {
  @IsString({ message: 'Author must be a string.' })
  @IsNotEmpty({ message: 'Author is required.' })
  @Length(3, 100, { message: 'Author must be between 3 and 100 characters.' })
  author: string;

  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Title is required.' })
  @Length(3, 100, { message: 'Title must be between 3 and 100 characters.' })
  title: string;

  @IsString({ message: 'Content must be a string.' })
  @IsNotEmpty({ message: 'Content is required.' })
  @Length(3, 5000, { message: 'Content must be between 3 and 5000 characters.' })
  content: string;

  @IsNotEmpty({ message: 'ChannelType is required.' })
  @IsEnum(ChannelType, {
    message: `ChannelType must be one of the following: ${Object.values(ChannelType).join(', ')}.`,
  })
  channelType: ChannelType;

  @IsNotEmpty({ message: 'Status is required.' })
  @IsEnum(Status, {
    message: `Status must be one of the following: ${Object.values(Status).join(', ')}.`,
  })
  status: Status;

  @IsISO8601({}, { message: 'sentAt must be a valid ISO 8601 date' })
  @IsNotEmpty({ message: 'sentAt is required' })
  @Matches(strictDateTimeWithTimezoneRegex, {
    message: 'sentAt must include a timezone, e.g.: 2020-08-07T12:34:56.789-03:00 or 2020-08-07T12:34:56Z',
  })
  sentAt?: string;
}
