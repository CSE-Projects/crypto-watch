import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Analytics } from "../../models/analytics"

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTransactions(){
    return this.http.get<Analytics[]>(this.baseUrl + '/analytics');
  }

}
