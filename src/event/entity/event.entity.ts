import { Column, DataType, Table, Model } from 'sequelize-typescript';

export interface EventAttributes {
  name?: string;
  description?: string;
  date?: Date;
  beginBet?: Date;
  endBet?: Date;
}

export type EventCreationAttributes = Omit<EventAttributes, 'id'>;

@Table
export class Event extends Model<EventAttributes, EventCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  beginBet?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  endBet?: Date;
}
