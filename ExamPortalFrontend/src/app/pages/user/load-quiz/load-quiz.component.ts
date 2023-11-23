import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent {
  public catId:any;
  public quizzes:any = [];
  constructor(private route:ActivatedRoute , private quizService:QuizService){}

  ngOnInit(){
    
    // whenever there will be change in the route, this below function will 
    // get executed and params will have new value 
    this.route.params.subscribe((params)=>{
      this.catId = params['catId'];

      // console.log(this.catId);
      if(this.catId == 0){
        console.log("Load all quizzes");
        this.quizService.getActiveQuizzes().subscribe(
          (data:any) =>{
            console.log(data);
            this.quizzes = data;
          },
          (error:any) =>{
            console.log(error);
            Swal.fire("Error" , "Error is loading categories");
          }
        )
      }
      else{
        console.log("Load specific quiz");
        // this.quizzes = [];
        this.quizService.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data:any)=>{
            this.quizzes = data;
          },
          (error:any) =>{
            alert("Error in loading quiz");
          }
        )
      }
    })
    
  }
}
