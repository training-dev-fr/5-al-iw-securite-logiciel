import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string | undefined;

  @IsString()
  @IsNotEmpty()
  password: string | undefined;
}
