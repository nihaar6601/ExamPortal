import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  url = "http://localhost:8080"; 

  public getQuestionById(quesId:any){
    return this.http.get(`${this.url}/question/${quesId}` , {withCredentials:true});
  }

  public getQuestionsOfQuiz(qId:any){
    return this.http.get(`${this.url}/question/quiz/all/${qId}` , {withCredentials:true});
  }

  public getQuestionsOfQuizForTest(qId:any){
    return this.http.get(`${this.url}/question/quiz/${qId}` , {withCredentials:true});
  }

  public addQuestion(question:any){
    return this.http.post(`${this.url}/question` , question , {withCredentials:true});
  }

  public deleteQuestionById(quesId:any){
    return this.http.delete(`${this.url}/question/${quesId}` , {withCredentials:true});
  }


  public evalQuiz(questions:any){
    return this.http.post(`${this.url}/question/eval-quiz` , questions , {withCredentials:true});
  }

  public updateQuestion(question:any){
    return this.http.put(`${this.url}/question` , question , {withCredentials:true});
  }

  public submitScore(object:any){
    console.log("Submitting marks");
    return this.http.post(`${this.url}/user/marks` , object , {withCredentials:true});
  }
}
