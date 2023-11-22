import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent {
  constructor(private route:ActivatedRoute , private questionService:QuestionService , private snack:MatSnackBar){}

  public qid:any;
  public qTitle:any;
  public questions :any =[];
  ngOnInit(){
    this.qid = this.route.snapshot.params['qId'];
    console.log(this.qid);
    this.qTitle = this.route.snapshot.params['title'];
    console.log(this.qTitle);

    this.questionService.getQuestionsOfQuiz(this.qid).subscribe(
      (data:any) =>{
        console.log(data);
        this.questions = data;
      },
      (error:any) =>{
        console.log(error);
        
      }
    )
  }


  deleteQuestion(quesId:any){
    // alert(quesId);
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure you want to delete the question?'
    }).then((result:any)=>{
      if(result.isConfirmed){
        this.questionService.deleteQuestionById(quesId).subscribe(
          (data:any)=>{
            this.snack.open("Question deleted",'',{duration:3000});
            this.questions = this.questions.filter((q:any) => q['quesId'] != quesId)
          },
          (error:any)=>{
            this.snack.open("Error in deleting question",'',{duration:3000});
          }
        )
      }
    })
  }
}
