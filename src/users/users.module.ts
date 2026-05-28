import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SecurityModule } from 'src/security/security.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), SecurityModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
