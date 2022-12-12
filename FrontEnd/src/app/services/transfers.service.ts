import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TransferDto } from './../models/transfer-dto.model';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TransfersService {
  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = `${environment.baseURL}/api/Transacciones`;
  }

  postTransfer(transferDto: TransferDto): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseURL, transferDto);
  }

  getPagosByUsername(username: string): Observable<Array<Array<String>>> {
    return this.http.get<Array<Array<String>>>(
      `${this.baseURL}/pagos/${username}`
    );
  }

  getCobrosByUsername(username: string): Observable<Array<Array<String>>> {
    return this.http.get<Array<Array<String>>>(
      `${this.baseURL}/cobros/${username}`
    );
  }
}
