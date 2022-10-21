import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [AuthModule, ClientModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
