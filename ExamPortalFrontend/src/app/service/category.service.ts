import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  url = "http://localhost:8080";

  public getCategories(){
    return this.http.get(`${this.url}/category` );
  }

  public addcategory(category:any){
    return this.http.post(`${this.url}/category` , category);
  }

  public deleteCategory(cid:any){
    return this.http.delete(`${this.url}/category/${cid}`);
  }
}
