import { IAnnouncementRepository } from '@announcement/application/interfaces/IAnnouncementRepository';
import { AnnouncementInMemoryRepository } from '../in-MemoryRepository/announcementInMemoryRepository';
import { GetAnnouncementsUseCase } from '@announcement/application/use-cases/getAnnouncementsUseCase';
import { ChannelType, Status } from '@announcement/application/entities/announcement';
import {
  announcementEntityMock,
  announcementEntityMockChannelType,
  announcementEntityMockStatus,
} from '../mockData/announcementMock';

let announcementRepository: IAnnouncementRepository;
let getAnnouncements: GetAnnouncementsUseCase;

describe('Get Announcements UseCase', () => {
  beforeEach(async () => {
    announcementRepository = new AnnouncementInMemoryRepository();
    getAnnouncements = new GetAnnouncementsUseCase(announcementRepository);
  });

  it('should be able to list announcements by author', async () => {
    const spyRepository = jest.spyOn(announcementRepository, 'findAllAnnouncements');
    await announcementRepository.createAnnouncement(announcementEntityMock);

    const announcements = await getAnnouncements.execute({
      author: announcementEntityMock.author,
    });

    expect(spyRepository).toHaveBeenCalledTimes(1);
    expect(announcements.data).toHaveLength(1);
    expect(announcements.data[0]).toMatchObject(announcementEntityMock);
  });

  it('should be able to list announcements by status', async () => {
    const spyRepository = jest.spyOn(announcementRepository, 'findAllAnnouncements');
    await announcementRepository.createAnnouncement(announcementEntityMockStatus);

    const announcements = await getAnnouncements.execute({
      status: Status.sent,
    });

    expect(spyRepository).toHaveBeenCalledTimes(1);
    expect(announcements.data).toHaveLength(1);
    expect(announcements.data[0]).toMatchObject(announcementEntityMockStatus);
  });

  it('should be able to list announcements by channelStatus', async () => {
    const spyRepository = jest.spyOn(announcementRepository, 'findAllAnnouncements');
    await announcementRepository.createAnnouncement(announcementEntityMockChannelType);

    const announcements = await getAnnouncements.execute({
      channelType: ChannelType.email,
    });

    expect(spyRepository).toHaveBeenCalledTimes(1);
    expect(announcements.data).toHaveLength(1);
    expect(announcements.data[0]).toMatchObject(announcementEntityMockChannelType);
  });

  it('should be able to list announcements by limit', async () => {
    const spyRepository = jest.spyOn(announcementRepository, 'findAllAnnouncements');
    await announcementRepository.createAnnouncement(announcementEntityMockChannelType);

    const announcements = await getAnnouncements.execute({
      channelType: ChannelType.email,
      limit: 0,
    });

    expect(spyRepository).toHaveBeenCalledTimes(1);
    expect(announcements.data).toHaveLength(0);
  });

  it('should be able to list announcements by page', async () => {
    const spyRepository = jest.spyOn(announcementRepository, 'findAllAnnouncements');
    await announcementRepository.createAnnouncement(announcementEntityMockChannelType);

    const announcements = await getAnnouncements.execute({
      channelType: ChannelType.email,
      page: 99,
    });

    expect(spyRepository).toHaveBeenCalledTimes(1);
    expect(announcements.data).toHaveLength(0);
  });
});
