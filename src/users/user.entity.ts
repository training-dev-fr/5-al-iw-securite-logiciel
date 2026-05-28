import { Column, DataType, Table, Model } from "sequelize-typescript";

export interface UserAttributes{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export type UserCreationAttributes = Omit<UserAttributes, "id">;

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    firstname: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    lastname: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;
}