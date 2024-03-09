import { Body, Controller, Post } from '@nestjs/common';
import { AuthRequestDto } from './dtos/auth.request.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/generateToken')
  generateToken(@Body() body: AuthRequestDto) {
    return this.authService.generateToken(body);
  }
}
