import { Component, OnInit } from '@angular/core';
import {TransactionService} from "./transaction.service";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactions = this.transactionService.getTransactions();
  }

  // check validity of input
  checkValidity(input) {
    if (input == "" || input == null || input.includes(" ")) {
      return false;
    }
    return true;
  }

  // add a new transaction for the user
  addTransaction(payment_to, payment_from, value, time) {
    if (this.checkValidity(payment_to)&&this.checkValidity(payment_from)&&this.checkValidity(value)&&this.checkValidity(time)) {
      let data = {
        payment_to: payment_to,
        payment_from: payment_from,
        value: value,
        time: time
      };
      this.transactionService.newTransaction(data).subscribe(() => {
        this.transactions = this.transactionService.getTransactions();
      });
    }
  }
}
