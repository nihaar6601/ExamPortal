import { Component } from '@angular/core';
import { LoginService } from 'app/service/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public user :any;

  constructor(private login:LoginService){}

  ngOnInit(){
    this.user = this.login.getUser();
  }
}
