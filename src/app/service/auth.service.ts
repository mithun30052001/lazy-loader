import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiurl = 'http://localhost:3000/user'
  roleurl = 'http://localhost:3000/role'

  GetAll(){
     return this.http.get(this.apiurl); //gets all users
  }

  Getbycode(code:any){
    return this.http.get(this.apiurl+'/'+code); //gets a particular user by code
  }
  
  GetAllRole(){
    return this.http.get(this.roleurl); //gets all roles
  }

  Proceedregister(inputdata:any){
    return this.http.post(this.apiurl,inputdata); //post the input data to the api endpoint
  }

  Updateregister(code:any,updatedata:any){
    console.log("Updated data",updatedata);
    return this.http.put(`${this.apiurl}/${code}`,updatedata);
  }

  Updateuser(code:any,inputdata:any){
    return this.http.put(this.apiurl+'/'+code,inputdata); //update the credentials of a user in api endpoint
  }

  IsloggedIn(){
    return sessionStorage.getItem('username') != null;
  }

  GetUserrole(){
    return sessionStorage.getItem('userrole') != null? sessionStorage.getItem('userrole')?.toString() : '';
  }
  
  GetCurrentUser():Observable<Object>{
    const code = sessionStorage.getItem('username');
    return this.Getbycode(code);
  }

  UpdatePassword(code: any, newPassword: string): Observable<any> {
    return this.http.get(`${this.apiurl}/${code}`).pipe(
      switchMap((user: any) => {
        user.password = newPassword;
        return this.http.put(`${this.apiurl}/${code}`, user);
      })
    );
  }
}
