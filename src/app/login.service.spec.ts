import { TestBed, inject, async } from '@angular/core/testing';

import { LoginService } from './login.service';
import { Router } from '@angular/router';

fdescribe('LoginService Tests', () => {
  let loginService:any;
  let routeService:any;  
  

  beforeEach(() => {

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [LoginService, { provide:Router, useValue:routerSpy }]
    });
    loginService = TestBed.get(LoginService);
    routeService = TestBed.get(Router);

  });

  it('should be defined', () => {
    expect(loginService).toBeDefined();
  });

  it("should check if defaults are set",()=>{
    expect(loginService.isLoggedIn).toBeFalsy();
    expect(loginService.users.length).toEqual(1);
  });

  it("should add user if username does not exist",()=>{
    loginService.addUser("suhail","ahmed");
    let userObj=loginService.users.find((e)=>e.username=="suhail");
    expect(userObj.username).toEqual("suhail");
  });

  it("should not add user if username exists",()=>{
    loginService.addUser("suhail","ahmed");    
    expect(loginService.addUser("suhail","ahmed")).toBeFalsy();
    expect(loginService.addUser("suhail","ahmed2")).toBeFalsy();
  });

  it("should add a username if we add a same username but with lower or upper case",()=>{
    loginService.addUser("suhail","ahmed");    
    expect(loginService.addUser("Suhail","ahmed")).toBeTruthy();    

    loginService.addUser("RAMESH","123456");    
    expect(loginService.addUser("ramesh","123456")).toBeTruthy();    
  });

  it("should return a username exists",()=>{
    loginService.addUser("suhail","ahmed");    
    expect(loginService.checkUserName("suhail")).toBeTruthy();    
  });

  it("should return a username does not exists",()=>{     
    expect(loginService.checkUserName("Plowt")).toBeFalsy();    
  });

  it("should return a username does not exists, when different case used(case-sensitive test)",()=>{     
    loginService.addUser("suhail","ahmed");    
    expect(loginService.checkUserName("Suhail")).toBeFalsy();    
  });

  it('loginUser should return true observable if username and password supplied are correct',
    (done: DoneFn) => {
      loginService.loginUser("testaccount","123456").subscribe(value => {
      expect(value).toBeTruthy();
      done();
    });
  });

  it('loginUser should return false observable if username supplied is incorrect',
    (done: DoneFn) => {
      loginService.loginUser("testaccousnt","123456").subscribe(value => {
      expect(value).toBeFalsy();
      done();
    });
  });

  it('loginUser should return false observable if password supplied is incorrect',
    (done: DoneFn) => {
      loginService.loginUser("testaccount","123456s").subscribe(value => {
      expect(value).toBeFalsy();
      done();
    });
  });


  it('loginUser should navigate to github-users when username and password are correct',
    () => {
       // args passed to router.navigate() spy
      const spy = routeService.navigate as jasmine.Spy;      
      loginService.loginUser("testaccount","123456");  
      const navArgs = spy.calls.first().args[0];           
      expect(navArgs[0]).toBe('/github-users','should navigate to github-users');
    });

    xit("userLogout pre-conditions should be satisfied",()=>{
      /*
        Pending throw exception in code
      */ 
      expect(loginService.isLoggedIn).toBeTruthy();
    });

    it("userLogout should set service defaults i.e isLoggedIn to false",()=>{
      loginService.isLoggedIn=true;
      loginService.userLogOut();
      expect(loginService.isLoggedIn).toBeFalsy();
    });

    it("userLogout should navigate to root",()=>{            
      let spy = routeService.navigate as jasmine.Spy;
      loginService.userLogOut();
      let navArgs = spy.calls.first().args[0]; 
      expect(navArgs[0]).toBe('/','should navigate to root');           
    });

    it("check route guard isLoggedIn true route guard also returns true",()=>{
      loginService.isLoggedIn=true;
      expect(loginService.canActivate()).toBeTruthy();
    });

    it("check route guard isLoggedIn false route guard also returns false and navigates to root",()=>{    
      let spy = routeService.navigate as jasmine.Spy;     
      expect(loginService.canActivate()).toBeFalsy();
      let navArgs = spy.calls.first().args[0]; 
      expect(navArgs[0]).toBe('/','should navigate to root');  
    });
  


});


