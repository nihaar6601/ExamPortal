import { LocationStrategy } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'app/service/login.service';
import { QuestionService } from 'app/service/question.service';
import { QuizService } from 'app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent {
  
  constructor(private locationStrategy:LocationStrategy ,private loginService:LoginService,private router:Router, private route:ActivatedRoute,private questionService:QuestionService ,private quizService:QuizService){}
  public qid:any;
  public questions:any
  public marksGot :any;
  public correctAnswers :any;
  public attempted :any;
  public isSubmit:boolean = false;
  public timer:any;
  public qsSize:any;
  public maxMarks:any;
  public current_user:any;
  public marksData:any;

  ngOnInit(){

    this.preventBackButton();
    this.qid = this.route.snapshot.params['qId'];
    // alert(this.qid);

    this.quizService.getQuizById(this.qid).subscribe(
      (data:any) =>{
        this.maxMarks = data.maxMarks;
      }
    )

    this.loginService.getCurrentUser().subscribe(
      (data:any)=>{
        this.current_user = data;
        console.log(this.current_user);
        
      },
      (error:any)=>{
        console.log(error);
        
      }
    )

    this.loadQuestions();
  }

  loadQuestions(){
    this.questionService.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any) =>{
        console.log(data);
        this.questions = data;
        this.qsSize = this.questions.length;
        
        this.timer = this.questions.length*2*60;

        // this.questions.forEach((q:any)=>{
        //   q['givenAnswer']= '';
        // })

        this.startTimer();
      },
      (error:any) =>{
        alert("Error in loading test");
      }
    )
  }

  preventBackButton(){
    history.pushState(null,location.href);
    this.locationStrategy.onPopState(() =>{
      history.pushState(null,location.href);
    })
  }

  submitQuiz(){
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon:'info'
    }).then((e)=>{
      if(e.isConfirmed){
        this.evalQuiz();        
      }
    })
  }

  startTimer(){
    let t = window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }
      else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime(){
    let minute = Math.floor(this.timer/60);
    let seconds = this.timer - minute*60;
    return `${minute} min : ${seconds} sec`;
  }

  

  evalQuiz(){

      this.questionService.evalQuiz(this.questions).subscribe(
        (data:any) =>{
          console.log("Response from Server : " + data['marksGot'] , data['correctAnswers'] , data['attempted']);
    
          //this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
          this.marksGot = parseFloat(Number(data['marks']).toFixed(2));
          this.correctAnswers = data['answers'];
          this.attempted = data['attempted'];
          this.isSubmit = true;

          console.log(this.marksGot + " " + this.correctAnswers + " " + this.attempted);

          
           
          this.marksData = {
            marks: this.marksGot,
            quiz_id: (this.qid) ,
            user_id:this.current_user.id
          }

          console.log(typeof(this.marksData.marks) , typeof(this.marksData.quiz_id), typeof(this.marksData.user_id));
          
          console.log("Marks Object");
          console.log(this.marksData);
          console.log("Marks Object");
          
          
          // submit marks logic
          this.questionService.submitScore(this.marksData).subscribe(
            (data:any)=>{
              console.log(data);
              
            },
            (error:any)=>{
              console.log(error);
              
            }
          );

        },
        (error:any)=>{
          console.log(error);
        }
      )

        // console.log(this.questions);
        // this.isSubmit = true;
        // this.questions.forEach((q:any)=>{
        //   if(q.givenAnswer == q.answer){
        //       this.correctAnswers++;
        //       let perQuestionMarks = this.questions[0].quiz.maxMarks/this.questions.length;
        //       this.marksGot += perQuestionMarks;
        //   }

        //   if(q.givenAnswer.trim()!=''){
        //     this.attempted++;
        //   }
        // })
        // console.log("Correct Answers" + this.correctAnswers);
        // console.log(this.marksGot);
        // console.log("Attempted" + this.attempted);
  }

  printPage(){
    window.print();
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: { preventDefault: () => void; }) {
  event.preventDefault();
}

review(){
  console.log("Reviewing........");
  this.router.navigate(['/review/'] , {queryParams: {questionsList: JSON.stringify(this.questions) }});
  
}


}


