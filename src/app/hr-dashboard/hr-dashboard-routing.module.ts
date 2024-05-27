import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HrDashboardComponent } from './hr-dashboard.component';

const routes: Routes = [
  { path: '', component: HrDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrDashboardRoutingModule { }
