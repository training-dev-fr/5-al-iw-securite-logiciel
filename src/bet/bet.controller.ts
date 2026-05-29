import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BetService } from './bet.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { Permissions } from 'src/auth/decorator/permissions.decorator';
import { PermissionsGuard } from 'src/auth/guard/permissions.guard';
import { Owner } from 'src/auth/decorator/owner.decorator';
import { Bet } from './entity/bet.entity';

@UseGuards(PermissionsGuard)
@UseGuards(JwtAuthGuard)
@Controller('/bets')
export class BetController {
  constructor(private readonly betsService: BetService) {}

  @Permissions('bet.read')
  @Get()
  findAll() {
    return this.betsService.findAll();
  }

  @Permissions('bet.read')
  @Owner(Bet,'id','userId')
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.betsService.findById(id);
  }

  @Permissions('bet.create')
  @Post()
  create(@Body() user: CreateBetDto) {
    return this.betsService.create(user);
  }
}
