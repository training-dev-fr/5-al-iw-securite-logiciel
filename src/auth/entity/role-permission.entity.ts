import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Table({ tableName: 'role_permissions' })
export class RolePermission extends Model {
  @ForeignKey(() => Role)
  @Column
  roleId?: string;

  @ForeignKey(() => Permission)
  @Column
  permissionId?: string;
}
