import { Component, OnInit } from '@angular/core';
import { RegisterService } from './auth.register.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService : RegisterService, private router: Router) { }

  ngOnInit() {
  }

  registerDetails(username, password, firstname, lastname, email, bitcoin, ether) {
    this.registerService.register(username, password, firstname, lastname, email, bitcoin, ether);
  }

}
