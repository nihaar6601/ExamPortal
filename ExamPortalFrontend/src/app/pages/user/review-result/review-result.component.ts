import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-result',
  templateUrl: './review-result.component.html',
  styleUrls: ['./review-result.component.css']
})
export class ReviewResultComponent {
  
  constructor(private route:ActivatedRoute , private locationStrategy:LocationStrategy){}

  public questions:any;
  
  ngOnInit(){
    this.preventBackButton();
    this.questions = JSON.parse(this.route.snapshot.queryParams['questionsList']);
    console.log(this.questions);
   
    this.questions.forEach((q:any)=>{
      q.correct = false;
    })


    this.questions.forEach((q:any)=>{
      if(q.givenAnswer == q.answer){
        q.correct = true;
      }
      else{
        q.correct = false;
      }
    })

  }

  preventBackButton(){
    history.pushState(null,location.href);
    this.locationStrategy.onPopState(() =>{
      history.pushState(null,location.href);
    })
  }


  
}
