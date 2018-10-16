import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Group} from "../../models/group";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getGroups() {
    // token is implicitly sent by the jwt library
    return this.http.get<Group>(this.baseUrl + '/group');
  }
}
