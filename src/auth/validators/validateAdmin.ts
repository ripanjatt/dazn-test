import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { verifyJWT } from '../../utils/auth.utils';

/**
 * Validates the JWT token for the admit activities
 */
export const AdminValidator = createParamDecorator(
  async (_: any, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;
    const token = headers['Authorization'] || headers['authorization'];

    const user = verifyJWT(token);

    if (user) {
      // inserting the username for the admin
      ctx.switchToHttp().getRequest().body.user = user;
      return user;
    }

    throw new UnauthorizedException('Unauthorized action!');
  },
);
