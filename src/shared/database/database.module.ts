import { Module } from '@nestjs/common';
import { PrismaService } from './prismaService';
import { AnnouncementFakerSeed } from './seed/announcement.seed';
import { SeedRunner } from './seed/seedRunner';

@Module({
  providers: [PrismaService, SeedRunner, AnnouncementFakerSeed],
  exports: [PrismaService],
})
export class DatabaseModule {}
