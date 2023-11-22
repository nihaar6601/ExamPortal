import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public loginService: LoginService , private router:Router){}

  public isLoggedIn : boolean = false;
  // public user:any;
  

  ngOnInit(){
    this.isLoggedIn = this.loginService.isLoggedIn(); 
    // this.user = this.loginService.getUser();
  }

  
  logoutUser(){
    console.log("Logout button clicked");
    this.loginService.logout();
    
  }

  

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: { preventDefault: () => void; }) {
  event.preventDefault();
  }
}