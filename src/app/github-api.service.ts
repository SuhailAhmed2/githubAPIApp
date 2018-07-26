import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class GithubApiService {

  constructor(private http:HttpClient) { }

  getUsersData():Observable<any>
  {    
    /*
    let url='https://api.github.com/users';
    return this.http.get(url).pipe(      
      catchError((e,oj)=>{
        console.log("caught an error in getUsersData github-api.service");
        console.log(e);
        console.log(oj);
       return oj;
      }));
      */

     let url='https://api.github.com/users';
     return this.http.get(url).pipe(      
       catchError(this.handleError)
      );
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

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      
      // return an observable with a user-facing error message
      return throwError('A client-side or network error occurred. Please check your internet connection');
    }
    else if (error.error instanceof ProgressEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred: ProgressEvent');
      
      // return an observable with a user-facing error message
      return of({customError: true,message:'A client-side or network error occurred. Please check your internet connection' });
    }
     else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

        // return an observable with a user-facing error message
        return throwError('Server side error. Please try again');
    }
    
   
  };
}
