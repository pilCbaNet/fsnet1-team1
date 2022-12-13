import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  baseURL: string;
  constructor(private http: HttpClient) {
    this.baseURL = `${environment.baseURL}/api/Cuentas`;
  }

  findClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseURL}/${id}`);
  }

  findUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(``);
  }

  addBalance(clientId: number, balance: number) {
    return this.http.put<Client>(`${this.baseURL}/addbalance`, {
      id: clientId,
      monto: balance,
    });
  }

  getDepositosByUsername(username: string): Observable<Array<Array<String>>> {
    return this.http.get<Array<Array<String>>>(
      `${this.baseURL}/depositos/${username}`
    );
  }
}
