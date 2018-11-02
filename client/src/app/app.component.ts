import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import {of} from "rxjs/index";

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
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['auth']);
  }

  routeDashboard() {
    this.router.navigate(['']);
  }

}
