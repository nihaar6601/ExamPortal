import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/service/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  constructor(private loginService:LoginService){}

  logoutUser(){
   this.loginService.logout();
  }
}
