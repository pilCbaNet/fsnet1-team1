import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { TokenService } from './../../services/token.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  client?: Client;

  constructor(private clientService: ClientService, private ts: TokenService) {}

  addAmount(amount: number) {
    this.clientService.addBalance(this.client!.id, amount).subscribe((c) => {
      this.client!.balance = c.balance;
    });
  }

  ngOnInit(): void {
    this.clientService.findClientById(this.ts.getClientId()).subscribe((c) => {
      this.client = c;
    });
  }
}
