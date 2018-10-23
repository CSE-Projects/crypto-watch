import { Component, OnInit } from '@angular/core';
import {group} from "@angular/animations";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  groupNav;

  constructor() {
    this.groupNav = true;
  }

  ngOnInit() {
  }

  navToggle(i) {
    this.groupNav = i === 0;

  }

}
