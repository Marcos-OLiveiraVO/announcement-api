import { IAnnouncementRepository } from '@announcement/application/interfaces/IAnnouncementRepository';
import { AnnouncementInMemoryRepository } from '../in-MemoryRepository/announcementInMemoryRepository';
import { announcementEntityMock } from '../mockData/announcementMock';
import { GetAnnouncementUseCase } from '@announcement/application/use-cases/getAnnouncementUseCase';

let announcementRepository: IAnnouncementRepository;
let getAnnouncement: GetAnnouncementUseCase;

describe('Get Announcement UseCase', () => {
  beforeEach(async () => {
    announcementRepository = new AnnouncementInMemoryRepository();
    getAnnouncement = new GetAnnouncementUseCase(announcementRepository);
  });

  it('should be able to get an announcement', async () => {
    const spyRepository = jest.spyOn(announcementRepository, 'findAnnouncementById');
    await announcementRepository.createAnnouncement(announcementEntityMock);

    const announcement = await announcementRepository.findAnnouncementById(announcementEntityMock.id!);

    expect(announcement).toHaveProperty('id', announcementEntityMock.id);
    expect(spyRepository).toHaveBeenCalledTimes(1);
  });

  it('should be able to return null if announcement not found', async () => {
    const spyRepository = jest.spyOn(announcementRepository, 'findAnnouncementById');
    const announcement = await getAnnouncement.execute(announcementEntityMock.id!);

    expect(announcement).toBeNull();
    expect(spyRepository).toHaveBeenCalledTimes(1);
  });
});
