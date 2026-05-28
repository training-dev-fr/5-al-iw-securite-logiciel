import { IsNotEmpty, IsString, Length, IsDate } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name?: string;

  @IsString()
  description?: string;

  @IsDate()
  date?: Date;

  @IsDate()
  beginBet?: Date;

  @IsDate()
  endBet?: Date;
}
