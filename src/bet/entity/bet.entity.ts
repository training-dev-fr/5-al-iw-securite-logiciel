import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Event } from 'src/event/entity/event.entity';
import { User } from 'src/users/entity/user.entity';

export interface BetAttributes {
  amount?: number;
  eventId?: number;
  userId?: number;
}

export type BetCreationAttributes = Omit<BetAttributes, 'id'>;

@Table
export class Bet extends Model<BetAttributes, BetCreationAttributes> {
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount?: number;

  @ForeignKey(() => Event)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  eventId?: number;

  @BelongsTo(() => Event)
  event?: Event;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId?: number;

  @BelongsTo(() => User)
  user?: User;
}
