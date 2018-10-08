import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';


@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  // login using username password
  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>('/api/auth/login', {username: username, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  // logout
  logout() {
    localStorage.removeItem('access_token');
  }

  // get expiration date for a token string
  getTokenExpirationDate(token: string): Date {
    const decoded = jwtDecode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  // check if user is logged in i.e. token is present and not expired
  loggedIn() {
    const token = localStorage.getItem('access_token');
    if(!token) return false;

    // check token expiration
    const date = this.getTokenExpirationDate(token);
    if(date === undefined) {
      return true;
    }
    if (date.valueOf() > new Date().valueOf()) {
      return true
    }
    this.logout();
    return false;
  }
}
