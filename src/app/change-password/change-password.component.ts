import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  userData: any;

  constructor(
    private service: AuthService,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.service.GetCurrentUser().subscribe(data => {
      this.setCurrentUser(data);
    });

    this.changePasswordForm = this.builder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  setCurrentUser(profile: any) {
    this.userData = profile;
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmNewPassword = formGroup.get('confirmNewPassword')?.value;
    
    return newPassword === confirmNewPassword ? null : { mismatch: true };
  }

  changePassword() {
    const currentPassword = this.changePasswordForm.value.currentPassword;
    const confirmNewPassword = this.changePasswordForm.value.confirmNewPassword;
    const newPassword = this.changePasswordForm.value.newPassword;

    if (this.changePasswordForm.invalid || currentPassword !== this.userData.password) {
      if( newPassword!== confirmNewPassword){
        this.toastr.error('New password and confirm new password do not match');
      }
      else if (currentPassword !== this.userData.password) {
        this.toastr.error('Current password is incorrect.');
      }
      else{
        this.toastr.error('Please fill out all fields correctly.');
      }
      return;
    }

    this.service.UpdatePassword(this.userData.id, newPassword).subscribe(
      (response) => {
        this.toastr.success('Password changed successfully');
        this.clearForm();
        this.router.navigate(['profile'])
        console.log('Password updated successfully in the API');
      },
      (error) => {
        console.error('Failed to update password in the API:', error);
      }
    );
  }

  clearForm() {
    this.changePasswordForm.reset();
  }
}
