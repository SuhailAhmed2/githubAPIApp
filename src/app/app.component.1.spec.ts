import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { LoginService } from './login.service';
import { AppRoutingModule } from './app-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { APP_BASE_HREF } from '@angular/common';

fdescribe("App Component", ()=>{
    class mockLoginService
     {
      isLoggedIn=false;
      users=[];
      addUser=(x:string,y:string)=>{}
      checkUserName=(username:string)=>{}
      userLoggedIn=():Observable<boolean>=>{ return of(false)}
      loginUser=(username:string,password:string):Observable<boolean>=>{ return of(true)}
      userLogOut()
      {
        return of(false);
      }
      canActivate() {
      }
    };

    let fixture:any;
    let comp:any;
    let formBuilderService:any;
    let loginServ:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      declarations:[AppComponent,RegistrationComponent],
      providers: [ 
        FormBuilder,       
        { provide: LoginService, useClass: mockLoginService },
        {provide: APP_BASE_HREF, useValue : '/' }
      ],
      imports:[ReactiveFormsModule,AppRoutingModule]
    });

    fixture = TestBed.createComponent(AppComponent);
    comp    = fixture.componentInstance;
    formBuilderService = TestBed.get(FormBuilder);
    loginServ=TestBed.get(LoginService); 
    comp.ngOnInit();   

  });

  it("component class should be defined and defaults should be set or created", () =>{    
    expect(comp).toBeDefined();  
    expect(comp.submitted).toEqual(false);    
  });

  it("component class should give isLoggedIn$ observable false", () =>{    
 
    comp.isLoggedIn$.subscribe(res=>{
      expect(res).toEqual(false);
    })      
  });

  it("should define loginForm",()=>{
    console.log(comp.loginForm);
    expect(comp.loginForm).toBeDefined();
  });

  it('form invalid when empty', () => {
    expect(comp.loginForm.valid).toBeFalsy();
  });

  it('username and password field validity should be invalid', () => {
    let username = comp.loginForm.controls['username']; 
    let password = comp.loginForm.controls['password']; 
    expect(username.valid).toBeFalsy(); 
    expect(password.valid).toBeFalsy(); 
  });

  it('username and password field validity should be valid their values are set', () => {
    let username = comp.loginForm.controls['username']; 
    let password = comp.loginForm.controls['password']; 
    username.setValue('testaccount');
    password.setValue('123456');
    expect(username.valid).toBeTruthy(); 
    expect(password.valid).toBeTruthy(); 
  });

  
  it("isLoggedIn$ should return true when isLogin invoked with credentials",()=>{    
    //with valid credentials might be integration testing        
    let username = comp.loginForm.controls['username']; 
    let password = comp.loginForm.controls['password']; 
    username.setValue('testaccount');
    password.setValue('123456');  
    comp.isLogin();
    comp.isLoggedIn$.subscribe(res=>{
      expect(res).toBeTruthy();
    });    
  });  

  it("should have username and password resetted after isLogin",() =>{

    let username = comp.loginForm.controls['username']; 
    let password = comp.loginForm.controls['password']; 
    username.setValue('testaccount');
    password.setValue('123456');  
    
    // expect(username.value).toEqual('testaccount');
    // expect(password.value).toEqual('123456');

    comp.isLogin();

    expect(username.value).toBeNull();
    expect(password.value).toBeNull();

  });

  it("should return isLoggedIn$ observable false when logout mthod called",()=>{
    comp.logout();
    comp.isLoggedIn$.subscribe(res=>{
      expect(res).toBeFalsy();
    });
  });

  it("should set component defaults on logout and form should be resetted",()=>{
    comp.logout();
    expect(comp.subscribe).toBeFalsy();

    let username = comp.loginForm.controls['username']; 
    let password = comp.loginForm.controls['password'];     
    expect(username.value).toEqual('');
    expect(password.value).toEqual('');
  });

});
