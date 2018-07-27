import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubApiService } from '../github-api.service';
import { ActivatedRoute } from '@angular/router';
import { Pipe, Component, Directive, Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { GithubUserDetailComponent } from './github-user-detail.component';

import { ActivatedRouteStub } from '../../../testing';

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent {}

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

let activatedRoute: ActivatedRouteStub;

fdescribe('GithubUserDetailComponent', () => {
  let component: GithubUserDetailComponent;
  let fixture: ComponentFixture<GithubUserDetailComponent>;

  beforeEach(() => {

    const githubApiServ = jasmine.createSpyObj('GithubApiService', ['getUserData']); 
    activatedRoute = new ActivatedRouteStub();
    
    const stubValue = of({ name: "some data" });
    githubApiServ.getUserData.and.returnValue(stubValue);
    
    TestBed.configureTestingModule({      
      declarations: [ GithubUserDetailComponent,RouterOutletStubComponent,RouterLinkDirectiveStub],      
      providers: [{provide: GithubApiService, useValue:githubApiServ},{provide: ActivatedRoute, useValue:activatedRoute}]
    });
        
  });

  it('should create', () => {    
        
    fixture = TestBed.createComponent(GithubUserDetailComponent);
    component = fixture.componentInstance;
    let githubService=TestBed.get(GithubApiService);
    expect(component).toBeTruthy();
  });

  it('should have correct paramMap route parameters', () => {
       
    
    fixture = TestBed.createComponent(GithubUserDetailComponent);
    component = fixture.componentInstance;
    let githubService=TestBed.get(GithubApiService);
    let actRoute=TestBed.get(ActivatedRoute);

    spyOn(component.githubUserData$, "subscribe").and.callFake((callbackFn) => {
      console.log("checking from spy");
      console.log("subscribers callback function");
      console.log(callbackFn);
    });

    /*
      Used angulars doumentation testing folder placed as sibling to src folder. for activatedRoute
      and activatedRoute.setParamMap
      setted this paramMap for route parameters. stubbed functions in our constructor
      and checked using jasmine's matchers whter the route parameter sent is received or not.
    */


    actRoute.setParamMap({ username: "suhail"});
    console.log("githubService.getUserData.calls.mostRecent()");
    console.log(githubService.getUserData.calls.mostRecent());
    expect(githubService.getUserData.calls.mostRecent().args[0]).toContain("suhail");
});
  
});
