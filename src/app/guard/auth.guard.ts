import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

export function authGuard(): CanActivateFn  {
  return() => {
  const service:AuthService = inject(AuthService);
  const router:Router = inject(Router);

  if(service.IsloggedIn()){
    return true;
  }
  else{
    router.navigate(['login']);
    return false;
  }
 }
};
