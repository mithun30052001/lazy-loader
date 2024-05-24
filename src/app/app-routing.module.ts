import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guard/auth.guard';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CandidateDashboardComponent } from './candidate-dashboard/candidate-dashboard.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate: [authGuard()]},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'user',component:UserlistingComponent,canActivate: [authGuard()]},
  {path:'profile',component:ProfileComponent,canActivate: [authGuard()]},
  {path:'change-password', component:ChangePasswordComponent, canActivate: [authGuard()]},
  {path:'candidate',component:CandidateDashboardComponent,canActivate: [authGuard()]},
  {path:'vendor',component:VendorDashboardComponent,canActivate: [authGuard()]},
  {path:'employee',component:EmployeeDashboardComponent,canActivate: [authGuard()]},
  {path:'hr',component:HrDashboardComponent,canActivate: [authGuard()]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
