import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { TokenService } from './../../../services/token.service';
import { TransfersService } from 'src/app/services/transfers.service';
import { User } from 'src/app/models/user.model';
import { ToastService } from 'src/app/services/toast.service';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  @Input()
  transactions: Transaction[] = [];
  @Input()
  list: Array<Array<String>> = [];
  @Input()
  typeMov:string = "";

  @Input()
  pagosShow: boolean = true;

  @Input()
  cobrosShow: boolean = true;

  @Input()
  cobrosShow2: boolean = true;

  name: string = '';
  username: string = '';
  i: number = 0;
  

  constructor(
    private ts: TokenService,
    private transferService: TransfersService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.name = this.ts.getName();
    this.username = this.ts.getUsername();
    
  }
}
