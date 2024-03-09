import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRequestDto } from './dtos/auth.request.dto';
import { createJWT } from 'src/utils/auth.utils';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  private userName = process.env['ADMIN_NAME'];
  private passKey = process.env['ADMIN_PASSKEY'];

  async generateToken(body: AuthRequestDto) {
    if (
      body.user === this.userName &&
      (await bcrypt.compare(body.passKey, this.passKey))
    ) {
      return { token: createJWT(body.user) };
    }
    throw new UnauthorizedException('Unauthorized access!');
  }
}
