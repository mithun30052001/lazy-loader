import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private service:AuthService, private router: Router){}
  
  userRole:any

  ngOnInit() {
    this.userRole = this.service.GetUserrole();
    console.log('userrole',this.userRole);
    this.redirectToRoleDashboard();
  }
  
  redirectToRoleDashboard() {
    switch (this.userRole) {
      case 'candidate':
        this.router.navigate(['/candidate']);
        break;
      case 'vendor':
        this.router.navigate(['/vendor']);
        break;
      case 'employee':
        this.router.navigate(['/employee']);
        break;
      case 'hr':
        this.router.navigate(['/hr']);
        break;
      default:
        console.error('Unknown user role:', this.userRole);
        break;
    }
  }
}
