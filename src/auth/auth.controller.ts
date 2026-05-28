import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
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
}
