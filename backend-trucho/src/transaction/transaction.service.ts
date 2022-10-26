import { Inject, Injectable, HttpException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from 'src/Transaction/entities/transaction.entity';
import { Repository } from 'typeorm';
import { ClientService } from './../client/client.service';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: Repository<Transaction>,
    private clientService: ClientService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    if (createTransactionDto.giverName === createTransactionDto.receiverName) {
      throw new HttpException(
        'No puedes hacer una transferencia a la misma cuenta',
        400,
      );
    }

    const giver = await this.clientService.findOneByName(
      createTransactionDto.giverName,
    );

    if (giver.balance < createTransactionDto.amount) {
      throw new HttpException('No tienes suficiente dinero', 400);
    }

    const receiver = await this.clientService.findOneByName(
      createTransactionDto.receiverName,
    );

    //make a sql transaccion
    giver.balance -= createTransactionDto.amount;
    receiver.balance += createTransactionDto.amount;

    const g = await giver.save();
    const r = await receiver.save();

    //better selects
    g.balance = undefined;
    g.transfers = undefined;
    g.deposits = undefined;
    r.balance = undefined;
    r.transfers = undefined;
    r.deposits = undefined;

    const transaction = {
      amount: createTransactionDto.amount,
      giver: g,
      receiver: r,
    };

    return this.transactionRepository.save(transaction);
  }
  async findOne(id: number) {
    const t = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.giver', 'giver')
      .leftJoinAndSelect('transaction.receiver', 'receiver')
      .where('transaction.id = :id', { id })
      .getOne();

    if (!t) {
      throw new HttpException('Transaction not found', 404);
    }
    return t;
  }
}
