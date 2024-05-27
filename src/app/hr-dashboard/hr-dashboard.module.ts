import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrDashboardRoutingModule } from './hr-dashboard-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HrDashboardRoutingModule
  ],
  exports:[
    HrDashboardRoutingModule
  ]
})
export class HrDashboardModule { }
