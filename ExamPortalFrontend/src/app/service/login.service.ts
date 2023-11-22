import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/class/user';
//import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient , private router:Router) { }

  baseUrl = 'http://localhost:8080';
  //current-user details
  public getCurrentUser(){
    return this.http.get(`${this.baseUrl}/auth/current-user` , {withCredentials: true});
  }


  //Generate token
  public generateToken(user: User) {
    return this.http.post(`${this.baseUrl}/auth/login`, user);
  }

  //Login user: set tiken in localstorage
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;

  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    //this.router.navigate(['login']);
    //return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }


  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
