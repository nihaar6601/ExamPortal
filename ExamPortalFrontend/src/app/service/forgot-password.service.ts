import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Password } from '../class/password';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  url = "http://localhost:8080/auth";

  constructor(private http: HttpClient) { }

  public sendEmail(email:any) : Observable<any>{
    console.log("In forgotPassword Service sendEmail()");
    return this.http.post(`${this.url}/send-email` , email , {withCredentials: true}); 
  }

  public verifyOtp(otp:any) : Observable<any>{
    console.log("In ForgotPassword service verifyOtp()");
    return this.http.post(`${this.url}/verify-otp` , otp , {withCredentials: true});
  }

  public resetPassword(passwordObject:Password) : Observable<any> {
    console.log("In ForgotPassword service newPassword()");
    return this.http.post(`${this.url}/change-password` , passwordObject , {withCredentials: true});
  }
}
