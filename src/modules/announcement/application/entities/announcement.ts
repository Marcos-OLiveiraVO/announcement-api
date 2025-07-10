export enum ChannelType {
  email = 'email',
  slack = 'slack',
  teams = 'teams',
}

export enum Status {
  draft = 'draft',
  sent = 'sent',
}

export interface AnnouncementProps {
  author: string;
  title: string;
  content: string;
  channelType: ChannelType;
  status: Status;
  sentAt?: Date;
  createdAt?: Date;
  deletedAt?: Date;
}

export class Announcement {
  private props: AnnouncementProps;
  private _id?: number;

  constructor(props: AnnouncementProps, id?: number) {
    this.props = props;
    this._id = id;
  }

  public get id(): number | undefined {
    return this._id;
  }

  public set id(id: number | undefined) {
    this._id = id;
  }

  public get author(): string {
    return this.props.author;
  }

  public set author(author: string) {
    this.props.author = author;
  }

  public get title(): string {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get content(): string {
    return this.props.content;
  }

  public set content(content: string) {
    this.props.content = content;
  }

  public get channelType(): ChannelType {
    return this.props.channelType;
  }

  public set channelType(channelType: ChannelType) {
    this.props.channelType = channelType;
  }

  public get status(): Status {
    return this.props.status;
  }

  public set status(status: Status) {
    this.props.status = status;
  }

  public get sentAt(): Date | undefined {
    return this.props.sentAt;
  }

  public set sentAt(sentAt: Date | undefined) {
    this.props.sentAt = sentAt;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public set createdAt(createdAt: Date | undefined) {
    this.props.createdAt = createdAt;
  }

  public get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  public set deletedAt(deletedAt: Date | undefined) {
    this.props.deletedAt = deletedAt;
  }
}
