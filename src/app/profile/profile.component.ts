import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any; 
  editedUser: any;
  editing: boolean = false;
  profileForm!: FormGroup;

  constructor(private builder: FormBuilder,private service: AuthService, private router: Router,private toastr:ToastrService,) { }

  ngOnInit(): void {
    this.service.GetCurrentUser().subscribe(data=>{
      this.setCurrentUser(data);
    });
    this.profileForm = this.builder.group({
      id: ['',Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      isactive: [''],
    });
  }

  setCurrentUser(profile: any){
      this.user = profile;
      this.profileForm.patchValue({
        id: this.user.id,
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        gender: this.user.gender,
        role: this.user.role,
        isactive: this.user.isactive
      });
      console.log("Current user",this.user);
  }
  
  changePassword() {
    this.router.navigate(['/change-password']);
  }

  editProfile() {
    this.editing = true;
    this.editedUser = { ...this.user };
  }
  
  updateProfile() {
    console.log("Profile Form",this.profileForm.value);
    if (this.profileForm.valid) {
      this.user = { ...this.profileForm.value };
      this.editing = false;
      this.profileForm.disable(); 
      this.service.Updateregister(this.user.id,this.profileForm.value).subscribe(res=>{
        this.toastr.success('Your profile has been successfully updated');
      });
    } else {
      this.profileForm.markAllAsTouched();
      this.toastr.warning('Please enter valid data');
    }
  }
}
