import { Controller, HttpCode, Post } from '@nestjs/common';

@Controller()
export class CreateAnnouncementController {
  constructor() {}

  @Post()
  @HttpCode(201)
  async handle() {}
}
