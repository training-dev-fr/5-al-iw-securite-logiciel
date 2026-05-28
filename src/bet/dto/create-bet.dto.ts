import { IsNotEmpty, IsString, Length, IsDate } from 'class-validator';

export class CreateBetDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  amount?: number;

  @IsString()
  userId?: number;

  @IsDate()
  eventId?: number;
}
