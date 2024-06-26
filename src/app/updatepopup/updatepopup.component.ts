import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit{
  constructor(private builder:FormBuilder,private service:AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any,private toastr:ToastrService,
    private dialog:MatDialogRef<UpdatepopupComponent>){

  } 

  rolelist:any;
  editdata:any;

  ngOnInit(): void {
    this.service.GetAllRole().subscribe(res =>{
      this.rolelist = res;
    })
    if(this.data.usercode!=null && this.data.usercode!=''){
      this.service.Getbycode(this.data.usercode).subscribe(res=>{
          this.editdata = res;
          this.popupform.setValue({
            id: this.editdata.id, name: this.editdata.name,
            password: this.editdata.password, email: this.editdata.email, gender: this.editdata.gender,
            role: this.editdata.role, isactive: this.editdata.isactive
          });
      });
    }
  }

  popupform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('',Validators.required),
    isactive: this.builder.control(false)
  });
  
  updateuser(){
    if(this.popupform.valid){
      this.service.Updateuser(this.popupform.value.id,this.popupform.value).subscribe(res=>{
         this.toastr.success('Updated Successfully.');
         this.dialog.close();
      })
    }else{
       this.toastr.warning('Please Select Role.')
    }
  }
}
