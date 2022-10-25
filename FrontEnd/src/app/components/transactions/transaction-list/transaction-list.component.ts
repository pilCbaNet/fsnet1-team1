import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { TokenService } from './../../../services/token.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  @Input()
  transactions: Transaction[] = [];

  name: string = '';

  constructor(private ts: TokenService) {}

  ngOnInit(): void {
    this.name = this.ts.getName()
  }
}
