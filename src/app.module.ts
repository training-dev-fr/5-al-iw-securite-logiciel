import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/entity/user.entity';
import { SecurityModule } from './security/security.module';
import { AuthModule } from './auth/auth.module';
import { Role } from './auth/entity/role.entity';
import { Permission } from './auth/entity/permission.entity';
import { RolePermission } from './auth/entity/role-permission.entity';
import { UserRole } from './users/entity/user-role.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: '5-esgi-secu-logiciel',
      models: [User, Role, Permission, RolePermission, UserRole],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    SecurityModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
