import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

export function authGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const service: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    const toastr: ToastrService = inject(ToastrService);

    if (service.IsloggedIn()) {
      const requiredRole = route.data['role'];
      const userRole = service.GetUserrole();

      if (requiredRole) {
        if (userRole === requiredRole) {
          return true;
        } else {
          toastr.warning('You don\'t have access to this page');
          router.navigate(['']);
          return false;
        }
      }

      return true;
    } else {
      router.navigate(['login']);
      return false;
    }
  }
}
