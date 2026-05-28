import { Module } from '@nestjs/common';
import { BetController } from './bet.controller';
import { BetService } from './bet.service';
import { Bet } from './entity/bet.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Bet])],
  controllers: [BetController],
  providers: [BetService],
})
export class BetModule {}
