import { Injectable } from '@angular/core';

const AUTH_KEY = 'auth';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  setToken(token: string): void {
    localStorage.setItem(AUTH_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_KEY);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  public logout(): void {
    localStorage.removeItem(AUTH_KEY);
  }
}
