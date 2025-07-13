import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prismaService';
import { ChannelType, Status } from '@prisma/client';
import { faker } from '@faker-js/faker';

@Injectable()
export class AnnouncementFakerSeed {
  constructor(private prisma: PrismaService) {}

  async seed(quantity = 20, whipeAll: boolean = false): Promise<void> {
    const announcements = Array.from({ length: quantity }).map(() => {
      const createdAt = faker.date.between({
        from: '2024-12-01T00:00:00Z',
        to: '2025-06-01T00:00:00Z',
      });

      const sentAt = faker.date.between({
        from: createdAt,
        to: new Date(),
      });

      return {
        author: faker.person.fullName(),
        title: faker.lorem.sentence({ min: 3, max: 7 }).replace('.', ''),
        content: faker.lorem.paragraphs({ min: 2, max: 5 }),
        channelType: faker.helpers.arrayElement([ChannelType.email, ChannelType.slack, ChannelType.teams]),
        status: faker.helpers.arrayElement([Status.draft, Status.sent]),
        sentAt,
        createdAt,
        deletedAt: faker.datatype.boolean() ? faker.date.between({ from: sentAt, to: new Date() }) : null,
      };
    });

    if (whipeAll) {
      await this.prisma.announcement.deleteMany();
    }

    await this.prisma.announcement.createMany({
      data: announcements,
      skipDuplicates: true,
    });
  }
}
