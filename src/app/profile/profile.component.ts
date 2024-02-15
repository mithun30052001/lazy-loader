import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any; 

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.service.GetCurrentUser().subscribe(data=>{
      this.setCurrentUser(data);
    });
  }

  setCurrentUser(profile: any){
      this.user = profile;
      console.log("Current user",this.user);
  }
  
  changePassword() {
    this.router.navigate(['/change-password']);
  }
  
}
