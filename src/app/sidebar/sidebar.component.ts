import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements DoCheck {
  title = 'angular-dashboard';
  isnavmenurequired = true;
  isadminuser = false;

  constructor(private router: Router, private service: AuthService) {}

  ngDoCheck(): void {
    let currenturl = this.router.url;
    if (currenturl == '/login' || currenturl == '/register') {
      this.isnavmenurequired = false;
    } else {
      this.isnavmenurequired = true;
    }

    // Update isadminuser based on user role
    this.isadminuser = this.service.GetUserrole()==='admin';
  }
}
