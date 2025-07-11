import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInResponse } from '@shared/middleware/auth/application/interfaces/authenticationRequest';
import { AuthenticationService } from '@shared/middleware/auth/application/use-cases/authenticationService';
import { authDataMock } from '@shared/middleware/auth/tests/mockData/authMock';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post()
  @Public()
  async handle(): Promise<SignInResponse> {
    return await this.authenticationService.use(authDataMock);
  }
}
