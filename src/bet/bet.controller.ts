import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BetService } from './bet.service';
import { CreateBetDto } from './dto/create-bet.dto';

@Controller('/bets')
export class BetController {
  constructor(private readonly betsService: BetService) {}

  @Get()
  findAll() {
    return this.betsService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.betsService.findById(id);
  }

  @Post()
  create(@Body() user: CreateBetDto) {
    return this.betsService.create(user);
  }
}
