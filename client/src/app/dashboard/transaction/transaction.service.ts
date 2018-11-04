import { Injectable } from '@angular/core';
import {tap} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Transaction} from "../../models/transaction";

// sending json
// receiving a text response (https://github.com/angular/angular/issues/18586)
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text' as 'text'
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // get the transaction
  getTransactions() {
    return this.http.get<Transaction[]>(this.baseUrl + '/user/transactions/all');
  }

  // add a new transaction for the user
  newTransaction(value) {
    return this.http.post(this.baseUrl + '/user/transactions', value, httpOptions)
      .pipe( tap((result) => {
        if (result.includes("Error")) {
          (window as any).launch_toast(result);
          return;
        }}));
  }

}
