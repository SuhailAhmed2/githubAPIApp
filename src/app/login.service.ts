import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {

  isLoggedIn:boolean;

  users:Array<UserType>=[];

  constructor(private router: Router) { 
    this.isLoggedIn=false;
    this.users.push({username:"testaccount",password:"123456"});
  }

  addUser(username:string,password:string)
  {  
    /* Check for username and password if exist or not 
      If exists then do not add else add to the user list
    */ 
    if(this.users.find(ele=> ele.username == username) )
    {
      return false;      
    }
    else
    {   
      this.users.push({username:username,password:password});
      return true;
    }
  }

  checkUserName(username:string)
  {
    /*
      Method to check if the username existed or not
    */
    if(this.users.find(ele=> ele.username == username) )
    {
      return true;      
    }
    else
    {      
      return false;
    }
  }
  userLoggedIn():Observable<boolean>
  {
    /*
    Initially called to set user is logged in or not. Defaults to false
    Return an observable which emits false

    */
    this.isLoggedIn=false;
    return of(false);
  }

  loginUser(username:string,password:string):Observable<boolean>
  {
    //if condition checks username and password match with user provided input
    if(this.users.find(ele=> ele.username == username && ele.password == password) )
    {
      this.isLoggedIn=true;
      this.router.navigate(['/github-users']);
      return of(true);
    }
    else
    {
      this.isLoggedIn=false;
      return of(false);
    }
  }

  userLogOut()
  {
    /*
    Logs out the user and sets the user logged in variable to false.
    Also return observable which emits false.
    And, changes the route to home page.
     */
    this.isLoggedIn=false;
    this.router.navigate(['/']);
    return of(false);
  }

  canActivate() {

    //authentication guard routes having this class as guard will be traveresed to destination path
    //based on user has logged in himself or not    
    if(this.isLoggedIn)
    {
      return true;
    }
    else
    {
      //redirect user to home page
      this.router.navigate(['/']);
      return false;
    }
  }

}


interface UserType
{
  username:string,
  password:string
}