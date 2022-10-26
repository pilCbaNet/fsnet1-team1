import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { TokenService } from './../../services/token.service';
import { TransferDto } from './../../models/transfer-dto.model';
import { TransfersService } from './../../services/transfers.service';
import { ToastService } from './../../services/toast.service';
import { EventTypes } from 'src/app/models/event-types';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  client: Client = { balance: 0, deposits: [], transfers: [], name: '' };

  constructor(
    private clientService: ClientService,
    private ts: TokenService,
    private transferService: TransfersService,
    private toastService: ToastService
  ) {}

  addAmount(amount: number) {
    this.clientService.addBalance(this.client!.id!, amount).subscribe((c) => {
      this.client!.balance = c.balance;
    });
  }

  transfer(transferDto: TransferDto) {
    this.transferService.postTransfer(transferDto).subscribe({
      next: (t) => {
        this.client.balance -= t.amount;
        this.client.transfers.push(t);

        this.toastService.showToast(':D', `La transferencia fue exitosa`, EventTypes.Success);
      },
      error: (e) => {
        this.toastService.showToast(':(', e.error.message, EventTypes.Error);
      },
    });
  }

  ngOnInit(): void {
    if (this.ts.isAuthenticated()) {
      this.clientService
        .findClientById(this.ts.getClientId())
        .subscribe((c) => {
          this.client = c;
        });
    }
  }
}
