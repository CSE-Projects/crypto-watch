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
  // username = "";
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  // login using username password
  login(username, password) {
    return this.http.post(this.baseUrl + '/auth/login', {username: username, password: password}, httpOptions)
      .pipe(
        tap(result => {
          // console.log(result);
          if (result.includes("Error")) {
            // console.log("wrong password");
            (window as any).launch_toast(result);
            return;
          }
          result = result === undefined ? "" : result;
          localStorage.setItem('access_token', "" + result);
          localStorage.setItem('username', username);
          // this.username = localStorage.getItem('username');
          this.router.navigate(['/dashboard']);

        })
      )
  }

  // logout
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
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

  // fix to make dashboard username not display previous stored value in username variable
  getUsername() {
    if (this.loggedIn()) {
      return localStorage.getItem('username');
    }
    return '';
  }
}
