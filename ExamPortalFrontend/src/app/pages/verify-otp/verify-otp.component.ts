import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'app/service/forgot-password.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent {
  constructor(private forgotPasswordService:ForgotPasswordService , private router: Router ){}
  @ViewChild('f') formData: NgForm | any;
  public errorMessage : any = null;
  public otp : number ;

  verify(){
    console.log("Otp is entered");
    console.log("Please wait for verification");
    console.log("Otp entered is " , this.otp);
    
    this.forgotPasswordService.verifyOtp(this.otp).subscribe({
      next : (response:any) => {
        if(response){
          console.log("Verification successful");
          this.router.navigate(['reset-password']);
        }
        else{
          console.log("Verification not successful");
        }
      },
      error : (error:any) => {
        console.log(error);
        this.errorMessage = error.error;
        this.formData.reset();
      }
  })
  }
}
