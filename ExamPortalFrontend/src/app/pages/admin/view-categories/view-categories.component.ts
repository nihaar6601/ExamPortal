import { Component } from '@angular/core';
import { CategoryService } from 'app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent {
  categories :any = [];

  constructor(private categoryService : CategoryService){}
  ngOnInit(){
    this.categoryService.getCategories().subscribe(
      (data:any)=>{
        console.log(data);
        this.categories = data;
      },
      (error:any)=>{
        console.log(error);
        Swal.fire("Error" , "error in loading data" , "error");
      }
    )
  }

  deleteCategory(cId:any){
    console.log("Deleting.....");
    Swal.fire({
      icon:'info',
      title:"Are you sure?",
      confirmButtonText:'Delete',
      showCancelButton: true
    }).then((result)=>{
      if(result.isConfirmed){
        this.categoryService.deleteCategory(cId).subscribe(
        (data:any) =>{
          this.categories.filter((category:any)=> category.cid != cId);
          Swal.fire("Success" , "Quiz deleted" , 'success');
          this.ngOnInit();
        },
        (error:any) =>{
          console.log(error);
          Swal.fire("Error" , "Server Error" , 'error');
        })
      }

    })
  }

}
