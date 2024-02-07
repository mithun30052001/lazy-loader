import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiurl = 'http://localhost:3000/user'

  GetAll(){
     return this.http.get(this.apiurl); //gets all users
  }

  Getbycode(code:any){
    return this.http.get(this.apiurl+'/'+code); //gets a particular user by code
  }

  Proceedregister(inputdata:any){
    return this.http.post(this.apiurl,inputdata); //post the input data to the api endpoint
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
}
