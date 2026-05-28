import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
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

  @BelongsTo(() => Event)
  event?: Event;

  @BelongsTo(() => User)
  user?: User;
}
