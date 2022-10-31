import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'amount cannot be empty' })
  @IsNumber({}, { message: 'amount has to be a number' })
  @Min(1, { message: 'La cantidad tiene que ser igual o mayor a 1' })
  amount: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'giver cannot be empty' })
  giverName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'receiver cannot be empty' })
  receiverName: string;
}
