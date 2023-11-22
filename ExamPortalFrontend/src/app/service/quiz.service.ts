import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  url = "http://localhost:8080"; 

  public getQuizzes(){
    return this.http.get(`${this.url}/quiz` , {withCredentials:true});
  }

  public getQuizById(qId:any){
    return this.http.get(`${this.url}/quiz/${qId}` , {withCredentials:true});
  }

  public addQuiz(quiz:any){
    return this.http.post(`${this.url}/quiz` , quiz , {withCredentials:true});
  }

  public deleteQuiz(qId:any){
    return this.http.delete(`${this.url}/quiz/${qId}` , {withCredentials:true});
  }

  public updateQuiz(quiz:any){
    return this.http.put(`${this.url}/quiz` , quiz , {withCredentials:true});
  }

  public getQuizzesOfCategory(cid:any){
    return this.http.get(`${this.url}/quiz/category/${cid}` , {withCredentials:true});
  }

  public getActiveQuizzes(){
    return this.http.get(`${this.url}/quiz/active` , {withCredentials:true});
  }

  public getActiveQuizzesOfCategory(cid:any){
    return this.http.get(`${this.url}/quiz/category/active/${cid}` , {withCredentials:true});
  }

}
