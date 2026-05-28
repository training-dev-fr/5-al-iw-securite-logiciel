import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Permission } from './permission.entity';
import { RolePermission } from './role-permission.entity';

@Table({ tableName: 'roles' })
export class Role extends Model {
  @Column({ allowNull: false, unique: true })
  name?: string;

  @Column({ allowNull: false, unique: true })
  code?: string;

  @BelongsToMany(() => Permission, () => RolePermission)
  permissions?: Permission[];
}
