import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { validateToken } from '@shared/utils/functions/getToken';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());

    if (isPublic) {
      return true;
    }

    const response = validateToken(context);

    try {
      const body = await this.jwtService.verifyAsync(response.token, {
        secret: process.env.JWT_SECRET,
      });

      response.request.user = body;

      const request = context.switchToHttp().getRequest();
      const profileIdFromRequest = request.params.profileId || request.body.profileId || request.query.profileId;

      if (profileIdFromRequest && Number(body.profileId) !== Number(profileIdFromRequest)) {
        throw new UnauthorizedException('Token does not match the profile being accessed');
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
