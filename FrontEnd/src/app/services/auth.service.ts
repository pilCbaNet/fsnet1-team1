import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from './../../environments/environment';
import { Observable, tap } from 'rxjs';
import { TokenService } from './token.service';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.baseURL = `${environment.baseURL}/api/Usuarios`;
  }

  //loguea un usuario
  login(user: User): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseURL}/login `, user)
      .pipe(tap((u) => this.tokenService.login(u)));
  }

  //registra un usuario
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseURL}/register`, user);
  }
}
