import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {GroupTransaction} from "../models/groupTransaction";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

// sending json
// receiving a text response (https://github.com/angular/angular/issues/18586)
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text' as 'text'
};


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  // get the transaction for this group
  getUsers(group_name) {
    return this.http.get(this.baseUrl + '/group/' + group_name);
  }

  // get the transaction for this group
  getGroupTransactions(group_name) {
    return this.http.get<GroupTransaction[]>(this.baseUrl + '/group/transactions/' + group_name);
  }

  // add a new transaction in this group
  newGroupTransaction(value) {
    return this.http.post(this.baseUrl + '/group/transactions', value, httpOptions)
      .pipe( tap((result) => {
        if (result.includes("Error")) {
          (window as any).launch_toast(result);
          return;
        }}))
      .subscribe();
  }

  resolveTransactions(group_name) {
    return this.http.get<GroupTransaction[]>(this.baseUrl + '/group/transactions/resolve/' + group_name);
  }

}
