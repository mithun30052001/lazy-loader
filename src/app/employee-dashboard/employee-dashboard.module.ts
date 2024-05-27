import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeDashboardRoutingModule } from './employee-dashboard-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployeeDashboardRoutingModule
  ],
  exports:[
    EmployeeDashboardRoutingModule
  ]
})
export class EmployeeDashboardModule { }
