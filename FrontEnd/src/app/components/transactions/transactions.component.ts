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
import { registerLocaleData } from '@angular/common';

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
  listaCobros: Array<Array<String>> = [];
  listaPagos: Array<Array<String>> = [];
  listaDepositos: Array<Array<String>> = [];
  listaRetiros: Array<Array<String>> = [];

  pagosShow: boolean = true;
  depositosShow: boolean = true;

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
      this.getDepositosByUsername(this.user.username);
  }

  depositosFunction() {
    this.depositosShow = true;
  }

  retirosFunction() {
    this.depositosShow = false;
  }

  pagosFunction() {
    this.pagosShow = true;
  }

  cobrosFunction() {
    this.pagosShow = false;
  }

  transfer(transferDto: TransferDto) {
    this.transferService.postTransfer(transferDto).subscribe({
      next: (t) => {
        this.client.saldo -= t.amount;
        console.log(this.client.saldo)
        console.log(this.client.transfers)
        // this.client.transfers.unshift(t);

        this.toastService.showToast(
          ':D',
          `Transacción realizada con éxito`,
          EventTypes.Success
        );
        this.getPagosByUsername(this.user.username);
        window.location.reload()
      },
      error: (e) => {
        this.toastService.showToast(':(', e.error.message, EventTypes.Error);
      },
    });
  }

  getPagosByUsername(username: string) {
    this.transferService.getPagosByUsername(username).subscribe({
      next: (res) => {
        res.forEach((e) => {
          this.listaPagos.unshift([e[0], e[1], e[2], e[3]]);
        });
      },
      error: (e) => {},
    });
  }

  getCobrosByUsername(username: string) {
    this.transferService.getCobrosByUsername(username).subscribe({
      next: (res) => {
        res.forEach((e) => {
          this.listaCobros.unshift([e[0], e[1], e[2], e[3]]);
        });
      },
      error: (e) => {},
    });
  }

  getDepositosByUsername(username: string) {
    this.clientService.getDepositosByUsername(username).subscribe({
      next: (res) => {
        this.listaRetiros = []
        this.listaDepositos = []
        res.forEach((e) => {
          if (e[0][0] == '-') {
            this.listaRetiros.push([e[0], e[1]]);
            
          } else {
            this.listaDepositos.push([e[0], e[1]]);
          }
        });
        console.log(this.listaDepositos)
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
      this.getPagosByUsername(this.user.username);
      this.getCobrosByUsername(this.user.username);
      this.getDepositosByUsername(this.user.username);
      console.log(this.listaRetiros);
      console.log(this.listaDepositos);
    }
  }
}
