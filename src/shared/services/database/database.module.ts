import { Module } from '@nestjs/common';
import { PrismaService } from './prismaService';
import { AnnouncementFakerSeed } from './seed/announcement.seed';
import { SeedRunner } from './seed/seedRunner';

export type Prisma = Awaited<ReturnType<PrismaService['extensions']>>;

@Module({
  providers: [
    SeedRunner,
    AnnouncementFakerSeed,
    {
      provide: PrismaService,
      useFactory: async (): Promise<Prisma> => {
        return await new PrismaService().extensions();
      },
    },
  ],
  exports: [PrismaService],
})
export class DatabaseModule {}
