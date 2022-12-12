import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  AbstractControlOptions,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
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
  @Input()
  balance: number = 0;

  @Output()
  transferSend: EventEmitter<TransferDto> = new EventEmitter();

  transferForm: FormGroup;

  constructor(private fb: FormBuilder, private tokenService: TokenService) {
    this.transferForm = this.fb.group({
      amount: ['', [Validators.required, this.amountValidator()]],
      giverUsername: [],
      receiverUsername: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}

  reset() {
    this.transferForm.reset();
  }

  send() {
    this.transferForm.patchValue({
      giverUsername: this.tokenService.getUsername(),
    });
    this.transferSend.emit(this.transferForm.value);
  }

  amountValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      return value > this.balance ? { passwordStrength: true } : null;
    };
  }
}
