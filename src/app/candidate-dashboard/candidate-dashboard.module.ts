import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateDashboardRoutingModule } from './candidate-dashboard-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CandidateDashboardRoutingModule
  ],
  exports:[
    CandidateDashboardRoutingModule
  ]
})
export class CandidateDashboardModule { }
