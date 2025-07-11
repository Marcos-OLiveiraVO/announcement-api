import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

export function getTokenFromHeader(request: Request): string {
  const headers = request.headers as { authorization?: string };
  const [type, token] = headers.authorization?.split(' ') || [];

  return type === 'Bearer' ? token : '';
}

export function validateToken(context: ExecutionContext) {
  const request = context.switchToHttp().getRequest();
  const token = getTokenFromHeader(request);

  if (!token) {
    throw new UnauthorizedException('token was not provided');
  }

  return { token, request };
}
