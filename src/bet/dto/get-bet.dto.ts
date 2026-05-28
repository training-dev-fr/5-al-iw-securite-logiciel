import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateBetDto } from './create-bet.dto';

export class GetBetDto extends PartialType(
  OmitType(CreateBetDto, [] as const),
) {}
