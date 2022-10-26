import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { TransferDto } from './../../models/transfer-dto.model';

@Component({
  selector: 'app-transfer-balance-modal',
  templateUrl: './transfer-balance-modal.component.html',
  styleUrls: ['./transfer-balance-modal.component.css'],
})
export class TransferBalanceModalComponent implements OnInit {
  @Input()
  modalId!: string;

  @Output()
  transferSend: EventEmitter<TransferDto> = new EventEmitter();

  transferForm: FormGroup;

  constructor(private fb: FormBuilder, private tokenService: TokenService) {
    this.transferForm = this.fb.group({
      amount: ['', Validators.required],
      giverName: [],
      receiverName: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  reset() {
    this.transferForm.reset();
  }

  send() {
    this.transferForm.patchValue({ giverName: this.tokenService.getName() });
    this.transferSend.emit(this.transferForm.value);
  }
}
