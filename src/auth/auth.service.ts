import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PasswordService } from 'src/security/password/password.service';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async findByEmailWithPassword(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.userModel.findOne({
      where: { email },
      attributes: { include: ['password'] },
    });
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.dataValues.password) {
      throw new Error('User password not set');
    }
    if (
      !(await this.passwordService.verify(user.dataValues.password, password))
    ) {
      throw new Error('Invalid password');
    }
    return user;
  }

  async generateToken(user: User): Promise<string> {
    return this.jwtService.signAsync({ userId: user.dataValues.id });
  }
}
