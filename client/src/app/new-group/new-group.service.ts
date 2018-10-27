import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import { tap } from 'rxjs/operators';

// sending json
// receiving a text response (https://github.com/angular/angular/issues/18586)
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text' as 'text'
};


@Injectable({
  providedIn: 'root'
})
export class NewGroupService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  // create a new group
  createNewGroup(group_name, username_list) {
    let value = {
      group_name: group_name,
      username_list: username_list
    };
    return this.http.post(this.baseUrl + '/group', value, httpOptions)
      .pipe( tap(() => {console.log("re");this.router.navigate(['/dashboard']);}))
      .subscribe();
  }

}
