import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  category = {
    title: '',
    description : ''
  }

  constructor(private categoryService : CategoryService ,private snack:MatSnackBar ){}
  @ViewChild('f') formData: NgForm | any;

  onSubmit(){
    if(this.category.title.trim() == '' || this.category.title == null){
      this.snack.open("Title required" , '' , {duration:3000});
    }

    this.categoryService.addcategory(this.category).subscribe(
      (data:any)=>{
        Swal.fire('Success' , 'Category added successfully' , 'success');
        this.formData.reset();
      },
      (error:any) =>{
        console.log(error);
        Swal.fire('Error' , 'Server error' , 'error');
        
      }
    )
  }
}
