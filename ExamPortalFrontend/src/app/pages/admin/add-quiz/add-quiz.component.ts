import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'app/service/category.service';
import { QuizService } from 'app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {
  // categories : any =[];
  
  // quizData:any = {
  //   category:{
  //     cId:'',
  //   },
  //   title:'',
  //   description:'',
  //   maxMarks:'',
  //   numberOfQuestions:'',
  //   active:true    
  // }

  // constructor(private categoryService:CategoryService , private route:ActivatedRoute , private snack:MatSnackBar , private quizService : QuizService){}
  // public cid :any;
  // @ViewChild('f') formData: NgForm | any;

  // ngOnInit(){

  //   this.cid = this.route.snapshot.params['cId'];
  //   this.quizData.category.cId = this.cid;
  //   console.log(this.quizData);    

  //   this.categoryService.getCategories().subscribe(
  //     (data:any) =>{
  //       console.log(data);
  //       this.categories = data;
  //     },
  //     (error:any) =>{
  //       console.log(error);
  //       Swal.fire("Error" , "Error in loading data" , 'error') 
  //     }
  //   )
  // }

  // addQuiz(){
    
  //   if(this.quizData.title.trim()=='' || this.quizData.title == null){
  //     this.snack.open("Title required" , '' , {duration:3000});
  //     return ;
  //   }
    
  //   this.quizService.addQuiz(this.quizData).subscribe(
  //     (data:any) =>{
  //       console.log(data);
  //       Swal.fire("Success" , "Quiz is Added" , 'success');
  //       this.formData.reset();
  //     },
  //     (error:any) =>{
  //       console.log(error);
  //       Swal.fire("Error" , "Falied to load" , 'error');
  //     }
  //   )

  // }



  categories: any = [];
  quiz: any = {
    title: '',
    description: '',
    numberOfQuestions:'',
    maxMarks:'',
    active:true,
    category:{
      cid:''
    },
  };
 
  constructor(private router:Router, private quizSer:QuizService, private category:CategoryService, private snack:MatSnackBar){}
  ngOnInit(): void {
    this.category.getCategories().subscribe({
      next:(data:any)=>{
        this.categories=data;
        console.log(this.categories);
      },
      error:(error:any)=>{
        console.log(error);
        Swal.fire('Error','Error in loading data','error');
      }
    });
  }
 
 
  addQuiz(){
    if(this.quiz.title.trim()==''||this.quiz.title.trim()==null){
      this.snack.open('Data Required!!','OK');
      return;
    }
 
    this.quizSer.addQuiz(this.quiz).subscribe({
      next:(data:any)=>{
        Swal.fire('Success','Quiz is added','success');
        this.router.navigate(['/admin/quizzes'])
      },
      error:(error)=>{
        console.log(error);
        Swal.fire('error','Error occured while adding quiz','error');
      }
    });
  }
}
