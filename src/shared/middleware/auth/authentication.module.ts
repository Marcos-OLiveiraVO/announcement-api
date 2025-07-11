import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from '@shared/database/database.module';
import { AuthenticationService } from './application/use-cases/authenticationService';
import { AuthenticationController } from './infra/http/controllers/authenticationController';
import { AuthenticationGuard } from './infra/http/guards/authentication.guard';

@Module({
  imports: [DatabaseModule],
  providers: [AuthenticationService, AuthenticationGuard, JwtService],
  exports: [AuthenticationService, AuthenticationGuard, JwtService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
