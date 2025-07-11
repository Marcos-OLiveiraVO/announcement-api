import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PHPostsOutput } from '@shared/services/jsonPlaceHolder/application/interfaces/jsonPHRequest';
import { GetPostsUseCase } from '@shared/services/jsonPlaceHolder/application/use-cases/getPostsUseCase';

@ApiBearerAuth()
@Controller('integracao')
@ApiTags('JSON Placeholder Posts - (External API Integration)')
export class GetPostsController {
  constructor(private getPosts: GetPostsUseCase) {}

  @Get('/dados')
  @HttpCode(200)
  async handle(): Promise<PHPostsOutput> {
    return await this.getPosts.execute();
  }
}
