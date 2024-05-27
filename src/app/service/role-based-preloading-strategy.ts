import { Injectable } from '@angular/core';
import { Route, PreloadingStrategy } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleBasedPreloadingStrategy implements PreloadingStrategy {

  constructor(private authService: AuthService) { }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    const userRole = this.authService.GetUserrole();
    const requiredRole = route.data && route.data['role'];
    if (!requiredRole || userRole === requiredRole) {
      return load();
    } else {
      return of(null);
    }
  }
}
