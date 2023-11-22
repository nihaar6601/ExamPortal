import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Password } from 'app/class/password';
import { ForgotPasswordService } from 'app/service/forgot-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  constructor(private forgotPasswordService: ForgotPasswordService, private router: Router) { }
  @ViewChild('f') formData: NgForm | any;
  public errorMessage : any = null;
  public p = new Password();

  resetPassword() {
    console.log("New password");

      this.forgotPasswordService.resetPassword(this.p).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response) {
            console.log("Password Changed Successfully");
            this.router.navigate(['login']);
          }
          else {
            console.log("Passwords do not match");
          }
        },
        error: (error: any) => {
          console.log(error);
          this.errorMessage = error.error;
          this.formData.reset();
        }
      })
    
  }
}
