import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

export class GetEventDto extends PartialType(
  OmitType(CreateEventDto, [] as const),
) {}
