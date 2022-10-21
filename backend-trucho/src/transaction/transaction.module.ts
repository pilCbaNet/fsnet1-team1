import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { DatabaseModule } from 'src/database/database.module';
import { transactionProviders } from './transaction.providers';
import { ClientService } from './../client/client.service';
import { clientProviders } from 'src/client/client.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TransactionController],
  providers: [
    ...transactionProviders,
    ...clientProviders,
    TransactionService,
    ClientService,
  ],
})
export class TransactionModule {}
