import { Controller, Get, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@shared/database/prismaService';
import { Public } from '@shared/middleware/auth/infra/http/decorators/public.decorator';
import { ILoggerRepository } from '@shared/services/logger/application/interfaces/ILoggerRepository';

@Controller('/health')
@ApiTags('Health')
export class CheckDBController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: ILoggerRepository,
  ) {}

  @HttpCode(200)
  @Public()
  @Get('/db')
  async handle(): Promise<HttpStatus.OK | HttpStatus.SERVICE_UNAVAILABLE> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      this.logger.info({
        message: 'Database is available and app is running',
        context: { status: HttpStatus.OK },
      });

      return HttpStatus.OK;
    } catch (error) {
      this.logger.error({
        message: 'Database is unavailable',
        context: { status: HttpStatus.SERVICE_UNAVAILABLE },
      });

      throw new HttpException('Database is unavailable', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
