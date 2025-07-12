import { IAnnouncementRepository } from '@announcement/application/interfaces/IAnnouncementRepository';
import { AnnouncementInMemoryRepository } from '../in-MemoryRepository/announcementInMemoryRepository';
import { announcementEntityMock } from '../mockData/announcementMock';
import { DeleteAnnouncementUseCase } from '@announcement/application/use-cases/deleteAnnouncementUseCase';

let announcementRepository: IAnnouncementRepository;
let deleteAnnouncementUseCase: DeleteAnnouncementUseCase;

describe('Delete Announcement UseCase', () => {
  beforeEach(async () => {
    announcementRepository = new AnnouncementInMemoryRepository();
    deleteAnnouncementUseCase = new DeleteAnnouncementUseCase(announcementRepository);
  });

  it('should be able to delete an Announcement', async () => {
    const spyRepository = jest.spyOn(announcementRepository, 'deleteAnnouncement');
    await announcementRepository.createAnnouncement(announcementEntityMock);

    await deleteAnnouncementUseCase.execute(announcementEntityMock.id!);
    const announcement = await announcementRepository.findAnnouncementById(announcementEntityMock.id!);

    expect(announcement).toHaveProperty('deletedAt', expect.any(Date));
    expect(spyRepository).toHaveBeenCalledTimes(1);
  });
});
