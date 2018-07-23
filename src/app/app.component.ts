import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  //using observable isLoggedin$ to toggle between (login button, login form) and logout button in this view
  //based on users successful or failure of login this observable value is changed

  isLoggedIn$: Observable<boolean>;

  loginForm:FormGroup;

  submitted:boolean;

  constructor(private fb: FormBuilder,private loginSrv:LoginService)
  {
    this.createForm();    
    this.submitted=false;
  }

  ngOnInit() {
    //initially giving an observable who emits false initially
    //this observable is used to toggle between login form and logout button
    this.isLoggedIn$ = this.loginSrv.userLoggedIn();
  }
  logout()
  {
    //logs out user
    this.submitted=false;
    this.isLoggedIn$ = this.loginSrv.userLogOut();
    this.loginForm.setValue({username:'',password:''});
  }

  isLogin()
  {    
    //logs in user if username and password are correct
    this.submitted=true;    
    this.isLoggedIn$=this.loginSrv.loginUser(this.loginForm.get('username').value,this.loginForm.get('password').value);
    this.loginForm.reset();
  }

  createForm() {  
    //creates form using form builder and adds required validator  
    this.loginForm = this.fb.group({
      username: ['', Validators.required],       
      password: ['', Validators.required]    
    });
  }


  
}
