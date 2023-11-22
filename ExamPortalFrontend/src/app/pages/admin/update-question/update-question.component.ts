import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionService } from 'app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent {
  
  constructor(private route:ActivatedRoute , private questionService:QuestionService , private router:Router){}
  @ViewChild('f') formData: NgForm | any;

  public Editor = ClassicEditor;
  public question : any;
  public qid:any
  public qTitle : any;
  public quizId:any;
  ngOnInit(){

    this.quizId = this.route.snapshot.params['qId'];
    this.qid = this.route.snapshot.params['quesId'];
    this.qTitle = this.route.snapshot.params['quesTitle'];
    this.questionService.getQuestionById(this.qid).subscribe(
      (data:any) =>{
        console.log(data);
        this.question = data;
      },
      (error:any) =>{
        console.log(error);
        
      }
    )
  }

  updateQuestion(){
    console.log("Updating .....");
    this.questionService.updateQuestion(this.question).subscribe(
      (data:any) =>{
        Swal.fire("Success", "Quiz updated" , 'success').then((e)=>{
          this.formData.reset();
          this.router.navigate(['/admin/view-questions/' , this.quizId , this.qTitle ]);
        })
      },
      (error:any) =>{
        console.log(error);
        alert("Error in loading questions")
        
      }
    )
  }
}
