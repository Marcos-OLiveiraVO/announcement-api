import { Injectable } from '@nestjs/common';
import { AnnouncementFakerSeed } from './announcement.seed';

@Injectable()
export class SeedRunner {
  constructor(private readonly announcementSeeder: AnnouncementFakerSeed) {}

  async run(whipeAll: boolean = false, quantity: number = 20): Promise<void> {
    if (whipeAll) {
      await this.announcementSeeder.seed(quantity, true);
    }

    await this.announcementSeeder.seed();
  }
}
