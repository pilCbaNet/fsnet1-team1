import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-add-balance-modal',
  templateUrl: './add-balance-modal.component.html',
  styleUrls: ['./add-balance-modal.component.css'],
})
export class AddBalanceModalComponent implements OnInit {



  @Input()
  modalId!: string;

  @Output()
  amountSend: EventEmitter<number> = new EventEmitter();


  balance: number | undefined;

  constructor() {}

  ngOnInit(): void {}

  reset() {
    this.balance = undefined;
  }



  send() {
    if (this.balance && this.balance !== 0) {
      this.amountSend.emit(this.balance);
      window.location.reload();
    }
  }
}
