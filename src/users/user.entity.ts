import {
  Column,
  DataType,
  Table,
  Model,
  DefaultScope,
} from 'sequelize-typescript';

export interface UserAttributes {
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
}
