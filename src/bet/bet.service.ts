import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBetDto } from './dto/create-bet.dto';
import { Bet } from './entity/bet.entity';
import { InjectModel } from '@nestjs/sequelize';
import { GetBetDto } from './dto/get-bet.dto';

@Injectable()
export class BetService {
  constructor(
    @InjectModel(Bet)
    private betModel: typeof Bet,
  ) {}

  async findAll(): Promise<GetBetDto[]> {
    return await this.betModel.findAll();
  }

  async findById(id: number): Promise<Bet> {
    const bet = await this.betModel.findByPk(id);
    if (!bet) {
      throw new NotFoundException('Bet with id ${id} not found');
    }
    return bet;
  }

  async create(createBet: CreateBetDto): Promise<Bet> {
    return this.betModel.create(createBet);
  }
}
