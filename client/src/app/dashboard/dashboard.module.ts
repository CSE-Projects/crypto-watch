import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups/groups.component';
import { AnalyticsComponent } from './analytics/analytics.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GroupsComponent, AnalyticsComponent]
})
export class DashboardModule { }
