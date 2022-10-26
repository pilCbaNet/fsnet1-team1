import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TransferDto } from './../models/transfer-dto.model';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransfersService {
  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = `${environment.baseURL}/transaction`;
  }

  postTransfer(transferDto: TransferDto): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseURL, transferDto);
  }
}
