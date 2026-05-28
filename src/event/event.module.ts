import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventController } from './event.controller';
import { Event } from './entity/event.entity';
import { EventService } from './event.service';

@Module({
  imports: [SequelizeModule.forFeature([Event])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
