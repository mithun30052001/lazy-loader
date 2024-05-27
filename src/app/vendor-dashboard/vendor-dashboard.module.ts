import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorDashboardRoutingModule } from './vendor-dashboard-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VendorDashboardRoutingModule
  ],
  exports:[
    VendorDashboardRoutingModule
  ]
})
export class VendorDashboardModule { }
