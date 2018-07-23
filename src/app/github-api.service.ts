import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class GithubApiService {

  constructor(private http:HttpClient) { }

  getUsersData():Observable<any>
  {    
    let url='https://api.github.com/users';
    return this.http.get(url).pipe(      
      catchError((e,oj)=>{
        console.log("caught an error in getUsersData github-api.service");
        console.log(e);
        console.log(oj);
       return oj;
      }));
  }
  
  getUserData(username:string):Observable<any>
  {
    let url=`https://api.github.com/users/${username}`;
    return this.http.get(url).pipe(      
      catchError((e,oj)=>{
        console.log("caught an error in getUsersData github-api.service");
        console.log(e);
        console.log(oj);
       return oj;
      }));
  } 

  getUserRepoData(username:string):Observable<any>
  {
    let url=`https://api.github.com/users/${username}/repos`;
    return this.http.get(url).pipe(      
      catchError((e,oj)=>{
        console.log("caught an error in getUsersData github-api.service");
        console.log(e);
        console.log(oj);
       return oj;
      }));

  }
}
