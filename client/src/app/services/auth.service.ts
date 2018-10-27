import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';
import { environment } from '../../environments/environment';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { Router } from '@angular/router';

// sending json
// receiving a text response (https://github.com/angular/angular/issues/18586)
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text' as 'text'
};

@Injectable()
export class AuthService {
  username = "";
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  // login using username password
  login(username, password) {
    return this.http.post(this.baseUrl + '/auth/login', {username: username, password: password}, httpOptions)
      .pipe(
        tap(result => {
          // console.log(result);
          if (result.includes("Error")) {
            return;
          }
          result = result === undefined ? "" : result;
          localStorage.setItem('access_token', "" + result);
          this.username = username;
          this.router.navigate(['/dashboard']);
        })
      )
      .subscribe();
  }

  // logout
  logout() {
    localStorage.removeItem('access_token');
    this.username = null;
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
    // console.log(token)
    if (token === "" || token === null) return false;

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
