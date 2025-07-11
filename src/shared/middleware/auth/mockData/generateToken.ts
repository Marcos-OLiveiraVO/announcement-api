import { JwtService } from '@nestjs/jwt';

export const authDataMock = {
  email: 'infinityWorksTest@gmail.com',
  profileId: 1,
};

const secret = process.env.JWT_SECRET || 'secret_dev_token';
const expiresIn = process.env.JWT_EXPIRATION_TIME || '7d';

const token = new JwtService().sign(authDataMock, {
  secret: secret,
  expiresIn: expiresIn,
});

console.log('Generated Token:\n');
console.log(token);
