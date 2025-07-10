import { Module } from '@nestjs/common';
import { PrismaService } from './prismaService';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
