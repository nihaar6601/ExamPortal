import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionService } from 'app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  constructor(private route:ActivatedRoute , private questionService:QuestionService , private router:Router){}
  @ViewChild('f') formData: NgForm | any;
  public Editor = ClassicEditor;
  
  public qid : any;
  public qTitle:any

  public question={
    quiz:{
      qId:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };

  ngOnInit(){
    this.qid = this.route.snapshot.params['qId'];
    this.qTitle = this.route.snapshot.params['title'];
    console.log(this.qid);
    console.log(this.qTitle);
    this.question.quiz['qId'] = this.qid;
    console.log(this.question);
    
  }

  onSubmit(){
    if(this.question.content.trim()=='' || this.question.content==null){
      return ;
    }

    if(this.question.option1.trim()=='' || this.question.option1==null){
      return ;
    }

    if(this.question.option2.trim()=='' || this.question.option2==null){
      return ;
    }

    this.questionService.addQuestion(this.question).subscribe(
      (data:any)=>{
        console.log(data);
        Swal.fire("Success" , "Question added successfully" , 'success');
        this.formData.reset();
        this.router.navigate(['/admin/view-questions' ,this.qid , this.qTitle ]);
      },
      (error:any)=>{
        Swal.fire("Error" ,"Error in adding question" , 'error');
      }
    )
  }
}
