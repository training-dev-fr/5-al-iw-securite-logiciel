import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdatePasswordDto extends PartialType(
  OmitType(CreateUserDto, ['firstname', 'lastname', 'email'] as const),
) {}
