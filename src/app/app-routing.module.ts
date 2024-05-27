import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guard/auth.guard';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RoleBasedPreloadingStrategy } from './service/role-based-preloading-strategy';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard()] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserlistingComponent, canActivate: [authGuard()], data: { role: 'admin' } },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard()] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard()] },
  {
    path: 'candidate',
    loadChildren: () => import('./candidate-dashboard/candidate-dashboard.module').then(m => m.CandidateDashboardModule),
    canActivate: [authGuard()],
    data: { role: 'candidate', preload: true }
  },
  {
    path: 'vendor',
    loadChildren: () => import('./vendor-dashboard/vendor-dashboard.module').then(m => m.VendorDashboardModule),
    canActivate: [authGuard()],
    data: { role: 'vendor', preload: true }
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee-dashboard/employee-dashboard.module').then(m => m.EmployeeDashboardModule),
    canActivate: [authGuard()],
    data: { role: 'employee', preload: true }
  },
  {
    path: 'hr',
    loadChildren: () => import('./hr-dashboard/hr-dashboard.module').then(m => m.HrDashboardModule),
    canActivate: [authGuard()],
    data: { role: 'hr', preload: true }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: RoleBasedPreloadingStrategy })],
  exports: [RouterModule],
  providers: [RoleBasedPreloadingStrategy]
})
export class AppRoutingModule { }
