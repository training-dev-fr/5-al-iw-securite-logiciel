import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/auth/entity/role.entity';
import { User } from './user.entity';

@Table({ tableName: 'user_role' })
export class UserRole extends Model {
  @ForeignKey(() => Role)
  @Column
  roleId?: string;

  @ForeignKey(() => User)
  @Column
  userId?: string;
}
