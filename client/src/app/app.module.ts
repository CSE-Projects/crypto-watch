import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

// app components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GroupComponent } from './group/group.component';
// app modules
import {DashboardModule} from "./dashboard/dashboard.module";

import { AuthGuard } from "./services/auth.guard";
import { AuthService } from "./services/auth.service";



export function tokenGetter() {
  return localStorage.getItem('access_token');
}


@NgModule({
  declarations: [
    AppComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DashboardModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/api/auth', 'localhost:3000/api/auth/login']
      }
    })
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
