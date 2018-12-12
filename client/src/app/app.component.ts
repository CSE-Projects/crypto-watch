import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import {Observable, of} from "rxjs/index";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  drop = false;
  username;

  constructor(private auth: AuthService, private router: Router) {
    this.drop = false;
    this.username = localStorage.getItem('username');
    console.log(this.router.url);
  }

  logout() {
    this.auth.logout();
    // clear
    this.drop = false;
    this.username = "";
    this.router.navigate(['auth']);
  }

  routeDashboard() {
    this.router.navigate(['']);
  }

}
