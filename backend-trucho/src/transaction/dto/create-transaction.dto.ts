import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty({ message: 'amount cannot be empty' })
  @IsNumber({}, { message: 'amount has to be a number' })
  @Min(1, { message: 'amount has to be greater or equal than 1' })
  amount: number;

  @IsNotEmpty({ message: 'giver cannot be empty' })
  giverName: string;

  @IsNotEmpty({ message: 'receiver cannot be empty' })
  receiverName: string;
}
