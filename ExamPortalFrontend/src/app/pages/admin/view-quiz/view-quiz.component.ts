import { Component } from '@angular/core';
import { QuizService } from 'app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent {
  quiz : any = [];

  constructor(private quizService:QuizService){}

  ngOnInit(){
    this.quizService.getQuizzes().subscribe(
      (data:any) =>{
        console.log(data);
        this.quiz = data;
      },
      (error:any) =>{
        console.log(error);
        Swal.fire("Error" , "Server Error" , 'error');
      }
    )
  }

  deleteQuiz(qId:any){
    Swal.fire({
      icon:'info',
      title:"Are you sure?",
      confirmButtonText:'Delete',
      showCancelButton: true
    }).then((result)=>{
      if(result.isConfirmed){
        this.quizService.deleteQuiz(qId).subscribe(
        (data:any) =>{
          this.quiz.filter((quiz:any)=> quiz.qId != qId);
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


