import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInRequest, SignInResponse } from '../interfaces/authenticationRequest';

@Injectable()
export class AuthenticationService {
  constructor(private jwtService: JwtService) {}

  async use(data: SignInRequest): Promise<SignInResponse> {
    const body = {
      sub: data.email,
      profileId: data.profileId,
    };

    const signBody = await this.jwtService.signAsync(body, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });

    const token = { access_token: signBody };

    return token;
  }
}
