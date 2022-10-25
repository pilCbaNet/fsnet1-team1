import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddBalanceDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'clientId cannot be empty' })
  clientId: number;
  @ApiProperty()
  @IsNotEmpty({ message: 'balance cannot be empty' })
  @IsNumber({}, { message: 'balance must be a number' })
  @Min(1, { message: 'balance must be 1 or greater' })
  balance: number;
}
