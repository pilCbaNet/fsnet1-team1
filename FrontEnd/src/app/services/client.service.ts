import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  baseURL: string;
  constructor(private http: HttpClient) {
    this.baseURL = `${environment.baseURL}/client`;
  }

  findClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseURL}/${id}`);
  }

  addBalance(clientId: number, balance: number) {
    return this.http.post<Client>(`${this.baseURL}/addbalance`, {
      clientId,
      balance,
    });
  }
}
