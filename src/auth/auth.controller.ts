import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Throttle } from '@nestjs/throttler';
import { THROTTLER_CONFIG } from 'src/security/throttler.config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Throttle({
    default: THROTTLER_CONFIG.LOGIN
  })
  async login(@Body() user: LoginDto) {
    const auth = await this.authService.findByEmailWithPassword(
      user.email!,
      user.password!,
    );
    if (!auth) {
      throw new Error('Invalid credentials');
    }
    return this.authService.generateToken(auth);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
}
