import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from './../../environments/environment';
import { concatMap, map, Observable, of, tap, throwError } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.baseURL = `${environment.baseURL}/user`;
  }

  //devuelve todos los usuarios
  private findAllByName(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}?username=${username}`);
  }

  //valida si existe el usuario y si la contraseña esta bien
  private loginUserValid(user: User): Observable<User> {
    return this.findAllByName(user.username).pipe(
      concatMap((users) => {
        if (users.length === 1 && users[0].password === user.password) {
          return of(users[0]);
        } else {
          return throwError(() => new Error(`Usuario o contraseña incorrecta`));
        }
      })
    );
  }

  //valida si el nombre de usuario esta disponible
  private registerUserValid(user: User) {
    return this.findAllByName(user.username).pipe(
      concatMap((users) => {
        if (users.length === 0) {
          return this.http.post<User>(this.baseURL, user);
        } else {
          return throwError(() => new Error(`Nombre de usuario no disponible`));
        }
      })
    );
  }

  //loguea un usuario
  login(user: User): Observable<User> {
    return this.loginUserValid(user).pipe(
      tap((u) => this.tokenService.setToken(u.username))
    );
  }

  //registra un usuario
  register(user: User): Observable<User> {
    return this.registerUserValid(user);
  }
}
