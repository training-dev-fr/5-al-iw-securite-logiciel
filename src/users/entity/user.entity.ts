import {
  Column,
  DataType,
  Table,
  Model,
  DefaultScope,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserRole } from './user-role.entity';
import { Role } from 'src/auth/entity/role.entity';

export interface UserAttributes {
  roles: any;
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export type UserCreationAttributes = Omit<UserAttributes, 'id'>;

@DefaultScope({
  attributes: { exclude: ['password'] },
})
@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstname: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string | undefined;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[] | undefined;
}
