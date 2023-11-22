import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'app/service/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent {

  constructor(private categoryService:CategoryService , private snack:MatSnackBar){}

  public categories=[];

  ngOnInit(){
    this.categoryService.getCategories().subscribe(
      (data:any)=>{
        this.categories = data;
      },
      (error:any)=>{
        console.log(error);
        this.snack.open("Error in loading categories from server",'',{duration:3000});
        
      }
    )
  }
}
