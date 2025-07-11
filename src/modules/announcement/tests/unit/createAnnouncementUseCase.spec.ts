import { IAnnouncementRepository } from '@announcement/application/interfaces/IAnnouncementRepository';
import { CreateAnnouncementUseCase } from '@announcement/application/use-cases/createAnnouncementUseCase';
import { AnnouncementInMemoryRepository } from '../in-MemoryRepository/announcementInMemoryRepository';
import { ConflictException } from '@nestjs/common';
import { announcementMock, findAnnouncementMock } from '../mockData/announcementMock';

let announcementRepository: IAnnouncementRepository;
let createAnnouncementUseCase: CreateAnnouncementUseCase;

describe('Create Announcement UseCase', () => {
  beforeEach(async () => {
    announcementRepository = new AnnouncementInMemoryRepository();
    createAnnouncementUseCase = new CreateAnnouncementUseCase(announcementRepository);
  });

  it('should be able to create a Announcement', async () => {
    const spyRepository = jest.spyOn(announcementRepository, 'createAnnouncement');

    await createAnnouncementUseCase.execute(announcementMock);
    const announcement = await announcementRepository.findAnnouncementByTitle(findAnnouncementMock);

    expect(announcement).toBeTruthy();
    expect(spyRepository).toHaveBeenCalledTimes(1);
  });

  it('should not be able to create a Announcement if it already exists', async () => {
    await createAnnouncementUseCase.execute(announcementMock);

    await expect(createAnnouncementUseCase.execute(announcementMock)).rejects.toEqual(
      new ConflictException('Announcement already exists'),
    );
  });
});
