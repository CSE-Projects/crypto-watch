import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {tap} from "rxjs/operators";
import { Router } from '@angular/router';

// sending json
// receiving a text response (https://github.com/angular/angular/issues/18586)
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text' as 'text'
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  register(username, password, first_name, last_name, email_id, bitcoin, ether) {
    let values = {
      username: username,
      password: password,
      first_name: first_name,
      last_name: last_name,
      email_id: email_id,
      bitcoin: bitcoin,
      ether: ether
    }
    return this.http.post(this.baseUrl + '/auth', values, httpOptions)
      .pipe( tap(() => {this.router.navigate(['/auth']);}))
      .subscribe();
  }
}
