import { ChannelType, Status } from '@announcement/application/entities/announcement';
import { ApiProperty, IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { IsString, IsEnum, IsISO8601, IsNotEmpty, Length, Matches, IsOptional, IsNumber, IsPositive } from 'class-validator';

export const strictDateTimeWithTimezoneRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?(Z|[+-]\d{2}:\d{2})$/;

export class CreateAnnouncementDTO {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the author creating the announcement',
    minLength: 3,
    maxLength: 100,
  })
  @IsString({ message: 'Author must be a string.' })
  @IsNotEmpty({ message: 'Author is required.' })
  @Length(3, 100, { message: 'Author must be between 3 and 100 characters.' })
  author: string;

  @ApiProperty({
    example: 'Scheduled maintenance notice',
    description: 'Title of the announcement',
    minLength: 3,
    maxLength: 100,
  })
  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Title is required.' })
  @Length(3, 100, { message: 'Title must be between 3 and 100 characters.' })
  title: string;

  @ApiProperty({
    example: 'The system will be under maintenance from 10 PM to 12 AM...',
    description: 'Content or body of the announcement',
    minLength: 3,
    maxLength: 5000,
  })
  @IsString({ message: 'Content must be a string.' })
  @IsNotEmpty({ message: 'Content is required.' })
  @Length(3, 5000, { message: 'Content must be between 3 and 5000 characters.' })
  content: string;

  @ApiProperty({
    enum: ChannelType,
    example: ChannelType.email,
    description: `The communication channel through which the announcement will be sent. Ex: ${Object.values(ChannelType).join(', ')}`,
  })
  @IsNotEmpty({ message: 'ChannelType is required.' })
  @IsEnum(ChannelType, {
    message: `ChannelType must be one of the following: ${Object.values(ChannelType).join(', ')}.`,
  })
  channelType: ChannelType;

  @ApiProperty({
    enum: Status,
    example: Status.draft,
    description: `Current status of the announcement. Ex: ${Object.values(Status).join(', ')}`,
  })
  @IsNotEmpty({ message: 'Status is required.' })
  @IsEnum(Status, {
    message: `Status must be one of the following: ${Object.values(Status).join(', ')}.`,
  })
  status: Status;

  @ApiProperty({
    example: '2025-07-10T15:00:00-03:00',
    description: 'Datetime when the announcement is scheduled to be sent (ISO8601 with timezone)',
    format: 'date-time',
  })
  @IsISO8601({}, { message: 'sentAt must be a valid ISO 8601 date' })
  @IsNotEmpty({ message: 'sentAt is required' })
  @Matches(strictDateTimeWithTimezoneRegex, {
    message: 'sentAt must include a timezone, e.g.: 2020-08-07T12:34:56.789-03:00 or 2020-08-07T12:34:56Z',
  })
  sentAt?: string;
}

export class BasePaginationDTO {
  @ApiProperty({
    example: 1,
    description: 'Page number for pagination (optional)',
    required: false,
    minimum: 1,
  })
  @IsOptional({ message: 'page is optional' })
  @IsNumber({}, { message: 'page must be a number' })
  @IsPositive({ message: 'page must be a positive number' })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page (optional)',
    required: false,
    minimum: 1,
  })
  @IsOptional({ message: 'limit is optional' })
  @IsNumber({}, { message: 'limit must be a number' })
  @IsPositive({ message: 'limit must be a positive number' })
  limit: number;
}

export class GetAnnouncementsPaginatedDTO extends IntersectionType(
  BasePaginationDTO,
  PartialType(OmitType(CreateAnnouncementDTO, ['title', 'content', 'sentAt'] as const)),
) {
  @ApiProperty({
    example: '2025-07-01T00:00:00-03:00',
    description: 'Start date for filtering announcements (inclusive). Must include timezone.',
    format: 'date-time',
    required: false,
  })
  @IsString({ message: 'startDate must be a string.' })
  @IsOptional({ message: 'startDate is optional.' })
  @Matches(strictDateTimeWithTimezoneRegex, {
    message: 'startDate must include a timezone, e.g.: 2020-08-07T12:34:56.789-03:00 or 2020-08-07T12:34:56Z',
  })
  startDate: string;

  @ApiProperty({
    example: '2025-07-10T23:59:59-03:00',
    description: 'End date for filtering announcements (inclusive). Must include timezone.',
    format: 'date-time',
    required: false,
  })
  @IsString({ message: 'endDate must be a string.' })
  @IsOptional({ message: 'startDate is optional.' })
  @Matches(strictDateTimeWithTimezoneRegex, {
    message: 'endDate must include a timezone, e.g.: 2020-08-07T12:34:56.789-03:00 or 2020-08-07T12:34:56Z',
  })
  endDate: string;
}

export class UpdateAnnouncementDTO extends PartialType(OmitType(CreateAnnouncementDTO, ['author'])) {}
