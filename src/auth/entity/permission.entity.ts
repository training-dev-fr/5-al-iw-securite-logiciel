import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'permissions' })
export class Permission extends Model {
  @Column({ allowNull: false, unique: true })
  name?: string;
}
