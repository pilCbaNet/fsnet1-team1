import { Injectable } from '@angular/core';
import { LoginResponse } from './../models/login-response.model';

const TOKEN = 'TOKEN';
const USER_ID = 'USER_ID';
const CLIENT_ID = 'CLIENT_ID';
const NAME = 'NAME';
const USERNAME = 'USERNAME';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  getClientId(): number {
    return +localStorage.getItem(CLIENT_ID)!;
  }
  constructor() {}

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  getName(): string {
    return localStorage.getItem(NAME) || '';
  }

  getUsername(): string {
    return localStorage.getItem(USERNAME) || '';
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  login(loginDto: LoginResponse) {
    localStorage.setItem(TOKEN, loginDto.token);
    localStorage.setItem(USER_ID, loginDto.userId.toString());
    localStorage.setItem(CLIENT_ID, loginDto.clientId.toString());
    localStorage.setItem(NAME, loginDto.name);
    localStorage.setItem(USERNAME, loginDto.username);
  }

  public logout(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(CLIENT_ID);
    localStorage.removeItem(NAME);
    localStorage.removeItem(USERNAME);
  }
}
