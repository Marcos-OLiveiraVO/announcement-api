import { Controller, Get, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@shared/middleware/auth/decorators/public.decorator';
import { ICacheRepository } from '@shared/services/cache/application/interfaces/ICacheRepository';
import { ILoggerRepository } from '@shared/services/logger/application/interfaces/ILoggerRepository';

@Controller('/health')
@ApiTags('Health')
export class CheckCacheController {
  constructor(
    private readonly logger: ILoggerRepository,
    private readonly cache: ICacheRepository,
  ) {}

  @HttpCode(200)
  @Get('/cache')
  @Public()
  async handle(): Promise<HttpStatus.OK | HttpStatus.SERVICE_UNAVAILABLE> {
    try {
      await this.cache.healthCheck();

      this.logger.info({
        message: 'Redis is available',
        context: { status: HttpStatus.OK },
      });

      return HttpStatus.OK;
    } catch (error) {
      this.logger.error({
        message: 'Redis is unavailable',
        context: { status: HttpStatus.SERVICE_UNAVAILABLE },
      });

      throw new HttpException('Redis is unavailable', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
