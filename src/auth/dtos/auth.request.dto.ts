import { IsNotEmpty } from 'class-validator';

export class AuthRequestDto {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  passKey: string;
}
