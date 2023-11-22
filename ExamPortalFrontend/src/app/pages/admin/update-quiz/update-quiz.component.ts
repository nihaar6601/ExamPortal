import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
import { CategoryService } from 'app/service/category.service';
import { QuizService } from 'app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent {
  constructor(private route:ActivatedRoute , private quizService:QuizService , private categoryService:CategoryService, private router:Router){}

  public qid = 0;
  public quiz :any;
  public categories :any;
  @ViewChild('f') formData: NgForm | any;

  ngOnInit(){
    this.qid = this.route.snapshot.params['qId'];
    this.quizService.getQuizById(this.qid).subscribe(
      (data:any) =>{
       console.log(data);
       this.quiz = data; 
       console.log(this.quiz);
      },
      (error:any) =>{
        console.log(error);
      }
    )

    this.categoryService.getCategories().subscribe(
      (data:any) =>{
        console.log(data);
        this.categories = data;
      },
      (error:any) =>{
        console.log(error);
        alert("Error in loading categories");
      }
    )
  }


  updateQuiz(){
    this.quizService.updateQuiz(this.quiz).subscribe(
      (data:any) =>{
        Swal.fire("Success", "Quiz updated" , 'success').then((e)=>{
          this.formData.reset();
          this.router.navigate(['/admin/quizzes']);
        })
        
      },
      (error:any)=>{
        console.log(error);
        Swal.fire("Error" , "Error in Updating" , 'error');
      }
    )
  }
}
