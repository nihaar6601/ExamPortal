import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'app/service/forgot-password.service';
import { User } from 'app/class/user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  @ViewChild('f') formData: NgForm | any;
  //public user = new User();
  public errorMessage : any = null;
  public emailSent : boolean = false;
  public email : string;

  constructor(private router: Router , private forgotPasswordService:ForgotPasswordService){}
  
  forgotPassword(){
    this.emailSent = true;
    console.log("In forgot password");

    this.forgotPasswordService.sendEmail(this.email).subscribe({
       next : (response:any) => {
        if(response){
          console.log(response);
          
          console.log("Email Sent Successfully");
          this.router.navigate(['verify-otp']);
          
        }
        else{
          console.log("Email not sent");
          this.emailSent = false;
        }
        //alert("Hi");
        
        // console.log("Response from backend : " , response);
        // this.router.navigate(['verify-otp']);
         
      },
      error : (error:any)=>{
        console.log(error);
        this.errorMessage = error.error;
        this.formData.reset();
      }
    });
  }
}
