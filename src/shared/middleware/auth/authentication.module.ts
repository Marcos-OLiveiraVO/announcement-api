import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from './authenticationService';
import { AuthenticationGuard } from './authentication.guard';
import { DatabaseModule } from '@shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [AuthenticationService, AuthenticationGuard, JwtService],
  exports: [AuthenticationService, AuthenticationGuard, JwtService],
  controllers: [],
})
export class AuthenticationModule {}
