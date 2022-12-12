import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { TokenService } from './../../services/token.service';
import { TransferDto } from './../../models/transfer-dto.model';
import { TransfersService } from './../../services/transfers.service';
import { ToastService } from './../../services/toast.service';
import { EventTypes } from 'src/app/models/event-types';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  client: Client = {
    cbu: '',
    saldo: 0,
    fechaAlta: undefined,
    fechaBaja: undefined,
    transfers: [],
    deposits: [],
  };

  user: User = {
    username: '',
    password: '',
  };

  idCuenta: number = 0;
  lista: Array<Array<String>> = [];
  constructor(
    private clientService: ClientService,
    private ts: TokenService,
    private transferService: TransfersService,
    private toastService: ToastService,
    private authservice: AuthService
  ) {}

  addAmount(amount: number) {
    this.clientService
      .addBalance(this.client!.idCuenta!, amount)
      .subscribe((c) => {
        this.client!.saldo = c.saldo;
      });
  }

  transfer(transferDto: TransferDto) {
    this.transferService.postTransfer(transferDto).subscribe({
      next: (t) => {
        this.client.saldo -= t.amount;
        this.client.transfers.unshift(t);

        this.toastService.showToast(
          ':D',
          `Transacción realizada con éxito`,
          EventTypes.Success
        );
      },
      error: (e) => {
        this.toastService.showToast(':(', e.error.message, EventTypes.Error);
      },
    });
  }

  getByUsername(username: string) {
    this.transferService.getTransfersByUsername(username).subscribe({
      next: (res) => {
        res.forEach((e) => {
          var number: number = +e[0];
          this.lista.push([e[0], e[1], e[2], e[3]]);
        });
      },
      error: (e) => {},
    });
  }

  ngOnInit(): void {
    if (this.ts.isAuthenticated()) {
      this.user.username = this.ts.getUsername();
      this.clientService
        .findClientById(this.ts.getClientId())
        .subscribe((c) => {
          this.client = c;
        });
      this.getByUsername(this.user.username);
      console.log(this.user.username);
      console.log(this.user.password);
      console.log(this.lista);
    }
  }
}
