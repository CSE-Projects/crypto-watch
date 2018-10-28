import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './analytics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  analyse;
  constructor(private analyticsService: AnalyticsService, private router: Router) { }

  ngOnInit() {
    this.analyticsService.getTransactions().subscribe(
      (data) => {
        this.analyse = data;
        console.log(this.analyse);
        
      }
    );
  }

}
