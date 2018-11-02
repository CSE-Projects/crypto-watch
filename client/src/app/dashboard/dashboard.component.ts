import { Component, OnInit } from '@angular/core';
import {group} from "@angular/animations";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  navVar;

  constructor() {
    this.navVar = 1;
  }

  ngOnInit() {
  }

  navToggle(i) {
    this.navVar = i;

  }

}
