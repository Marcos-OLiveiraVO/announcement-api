import { Controller, Get, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@shared/database/prismaService';
import { ILoggerRepository } from '@shared/services/logger/application/interfaces/ILoggerRepository';

@Controller('/health')
export class CheckDBController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: ILoggerRepository,
  ) {}

  @HttpCode(200)
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
