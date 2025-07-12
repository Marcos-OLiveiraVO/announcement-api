import { IAnnouncementRepository } from '@announcement/application/interfaces/IAnnouncementRepository';
import { AnnouncementInMemoryRepository } from '../in-MemoryRepository/announcementInMemoryRepository';
import { announcementEntityMock, updateAnnouncementMock } from '../mockData/announcementMock';
import { UpdateAnnouncementUseCase } from '@announcement/application/use-cases/updateAnnouncementUseCase';

let announcementRepository: IAnnouncementRepository;
let updateAnnouncementUseCase: UpdateAnnouncementUseCase;

describe('Update Announcement UseCase', () => {
  beforeEach(async () => {
    announcementRepository = new AnnouncementInMemoryRepository();
    updateAnnouncementUseCase = new UpdateAnnouncementUseCase(announcementRepository);
  });

  it('should be able to update an announcement', async () => {
    const spyRepository = jest.spyOn(announcementRepository, 'updateAnnouncement');

    await announcementRepository.createAnnouncement(announcementEntityMock);
    const announcement = await announcementRepository.findAnnouncementById(announcementEntityMock.id!);

    await updateAnnouncementUseCase.execute(updateAnnouncementMock);
    const announcementUpdated = await announcementRepository.findAnnouncementById(announcementEntityMock.id!);

    expect(announcement).toHaveProperty('id', announcementUpdated?.id);
    expect(spyRepository).toHaveBeenCalledTimes(1);
    expect(announcementUpdated).toMatchObject({
      props: updateAnnouncementMock,
      _id: announcementEntityMock.id,
    });
  });

  it('should be able to return null if announcement not found', async () => {
    const spyRepository = jest.spyOn(announcementRepository, 'updateAnnouncement');
    const announcement = await updateAnnouncementUseCase.execute(updateAnnouncementMock);

    expect(announcement).toBeNull();
    expect(spyRepository).toHaveBeenCalledTimes(0);
  });
});
