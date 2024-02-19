import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder:FormBuilder,private toastr:ToastrService,
    private service:AuthService,private router:Router){
      sessionStorage.clear();
    }
  
  userdata: any;

  loginform = this.builder.group({
    username: this.builder.control('',Validators.required),
    password: this.builder.control('',Validators.required)
  });

  checkCredentials(userdata: any){
    if (this.userdata.password == this.loginform.value.password) {
      if (this.userdata.isactive) {
        sessionStorage.setItem('username', this.userdata.id);
        sessionStorage.setItem('userrole', this.userdata.role);
        this.router.navigate(['']);
      } else {
        this.toastr.error('Please contact admin', 'In Active User');
      }
    } else {
      this.toastr.error("Invalid Login Credentials");
    }
  }

  proceedlogin(){
      if (this.loginform.valid) {
        this.service.Getbycode(this.loginform.value.username).subscribe(
          (res) => {
            this.userdata = res;
            this.checkCredentials(this.userdata);
            console.log(this.userdata);
          },
          (error) => {
            this.service.GetByEmail(this.loginform.value.username).subscribe(
              (res) => {
                this.userdata = res[0];
                if(this.userdata){this.checkCredentials(this.userdata);}
                else{ this.toastr.error("Enter valid user credentials");}
                console.log(this.userdata);
              },
              (error) => {
                this.toastr.error("Enter valid user credentials");
              }
            );
          }
        );
      }
    }
    
}
