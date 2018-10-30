import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // username;
  drop = false;
  username = localStorage.getItem('username');

  constructor(private auth: AuthService, private router: Router) {
    this.username = localStorage.getItem('username');
    this.drop = false;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['auth']);
  }

  routeDashboard() {
    this.router.navigate(['']);
  }
}
