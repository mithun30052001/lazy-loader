import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

export function authGuard(): CanActivateFn  {
  return() => {
  const service:AuthService = inject(AuthService);
  const router:Router = inject(Router);
  const toastr:ToastrService = inject(ToastrService);
  
  if(service.IsloggedIn()){
    if(router.url.length > 0){
      let isUserMenu = window.location.href.includes('/user');
      if(isUserMenu){
        if(service.GetUserrole() == 'admin'){
          return true;
        }
        else {
          toastr.warning('You dont have access to this page');
          return false;
        }
      } 
      else{
        return true;
      }
    }
    else{
      return true;
    }
  }
  else{
    router.navigate(['login']);
    return false;
  }
 }
};
