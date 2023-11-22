import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from 'app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent {
  public qid : any;
  public quiz:any;
  constructor(private route:ActivatedRoute , private quizService:QuizService,private router:Router){}

  ngOnInit(){
    this.qid = this.route.snapshot.params['qId'];
    // alert(this.qid);
    this.quizService.getQuizById(this.qid).subscribe(
      (data:any) =>{
        console.log(data);
        this.quiz = data;
      },
      (error:any) =>{
        console.log(error);
        alert("Error in loading quiz data");
      }
    )
  }

  startQuiz(){
    Swal.fire({
      title: 'Do you want to start the quiz?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/start', this.qid]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
