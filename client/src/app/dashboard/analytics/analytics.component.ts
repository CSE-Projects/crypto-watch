import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './analytics.service';
import { Router } from '@angular/router';
import * as CanvasJS from './canvasjs.min';
import { DeprecatedDatePipe } from '@angular/common';

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
        // Calculations
        let username = localStorage.getItem('username');
        let x=[];
        let money = 0; 
        for(let i = 0; i < data.length; ++i) {
          if (data[i].payment_from == username) {
            money -= data[i].value;
            
          }
          else {
            money += data[i].value;
          }
          // console.log(+data[i][3].substr(5,2));
          x.push({
            x: new Date(+data[i].time.substr(0,4), +data[i].time.substr(5,2), +data[i].time.substr(8,2)),
            y: money
          });
        }
        console.log(x);

        let chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          theme: "light2",
          title:{
            text: "Analyse"
          },
          axisX:{
            valueFormatString: "DD MMM",
            crosshair: {
              enabled: true,
              snapToDataPoint: true
            }
          },
          axisY: {
            title: "Credit",
            crosshair: {
              enabled: true
            }
          },
          toolTip:{
            shared:true
          },  
          legend:{
            cursor:"pointer",
            verticalAlign: "bottom",
            horizontalAlign: "left",
            dockInsidePlotArea: true
          },
          data: [{
            type: "line",
            showInLegend: true,
            name: "Total Credit",
            markerType: "square",
            xValueFormatString: "DD MMM, YYYY",
            color: "#F08080",
            dataPoints: x


          }]
        });
        chart.render();
      }
    );
  }

}
