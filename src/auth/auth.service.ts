import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PasswordService } from 'src/security/password/password.service';
import { User } from 'src/users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role } from './entity/role.entity';
import { Permission } from './entity/permission.entity';

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
      include: [
        {
          model: Role,
          through: { attributes: [] },
          include: [{ model: Permission, through: { attributes: [] } }],
        },
      ],
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
    const dataValues = user.dataValues as {
      id: number;
      roles?: Array<Role & { permissions?: Permission[] }>;
    };

    return this.jwtService.signAsync({
      userId: dataValues.id,
      roles:
        dataValues.roles?.map((role) => ({
          name: role.dataValues.name,
          code: role.dataValues.code,
          permissions: role.dataValues.permissions?.map((permission) => permission.dataValues.name) ?? [],
        })) ?? [],
    });
  }

  async register(user: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordService.hash(user.password);
    return this.userModel.create({
      ...user,
      password: hashedPassword,
    });
  }
}
