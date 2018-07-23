import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm:FormGroup;
  submitted:boolean;
  
  registrationSuccessfull:boolean;
  constructor(private fb: FormBuilder, private loginServ:LoginService) { 
    this.submitted=false;
    this.registrationSuccessfull=false;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm()
  {
    /*
      Creates a form using form builder and also adds custom validators to the field
     */
    this.registrationForm = this.fb.group({
      username: ['', Validators.compose([Validators.required,this.checkUserName])],      
      passwordConfirmGroup: this.fb.group({        
        password: ['', Validators.required],
        confirm: ['', Validators.required],
      }, {validator: passwordMatcher}) 
    });
  }

  registerUser()
  {
    /*
      If username does not exists then user is registerred successfully.
      Registration be it successful or not we will reset the form.
    */
    this.submitted=true;   
    if(this.loginServ.addUser(this.registrationForm.get('username').value,this.registrationForm.get('passwordConfirmGroup').get('password').value))
    {
      this.registrationSuccessfull=true;
    }
    else
    {
      this.registrationSuccessfull=false;
    }
    this.registrationForm.reset();   
  }

  checkUserName = (c: AbstractControl) => {
    /*
    Using arrow function was must because using this in checkUserName function was getting undefined.
    Might be a bug in formbuilder.group while provided current class's normal function.
    Using arrow function this was preserved to the outer scope which is class.
     */
  
  //validates form based on user input
  //checks if user name is existing or not 
  //call login service to check if username existed or not and return value based on that value
  if(this.loginServ.checkUserName(c.value))  
  {
    return {'name_exists':true};
  }
  else{
    return null;
  }   
}

}

function passwordMatcher(c: AbstractControl) {
  //validates form based on user input
  //checks if password and confirm password are same or not
    return c.get('password').value === c.get('confirm').value ? null : {'nomatch': true};
}

