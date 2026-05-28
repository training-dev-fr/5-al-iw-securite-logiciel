import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entity/event.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateEventDto } from './dto/update-event.dto';
import { GetEventDto } from './dto/get-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event)
    private eventModel: typeof Event,
  ) {}

  async findAll(): Promise<GetEventDto[]> {
    return await this.eventModel.findAll();
  }

  async findById(id: number): Promise<Event> {
    const event = await this.eventModel.findByPk(id);
    if (!event) {
      throw new NotFoundException('Event with id ${id} not found');
    }
    return event;
  }

  async create(createEvent: CreateEventDto): Promise<Event> {
    return this.eventModel.create(createEvent);
  }

  async update(id: number, eventUpdate: UpdateEventDto): Promise<Event> {
    const event = await this.findById(id);
    return event.update(eventUpdate);
  }

  async remove(id: number): Promise<void> {
    const event = await this.findById(id);
    return await event.destroy();
  }
}
