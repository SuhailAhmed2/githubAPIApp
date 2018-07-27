import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubApiService } from '../github-api.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Directive, Input } from '@angular/core';

import { GithubUserRepoComponent } from './github-user-repo.component';


import { ActivatedRouteStub } from '../../../testing';
import { of } from 'rxjs';
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

  fdescribe('GithubUserRepoComponent', () => {
    let component: GithubUserRepoComponent;
    let fixture: ComponentFixture<GithubUserRepoComponent>;
  
    beforeEach(() => {
  
      const githubApiServ = jasmine.createSpyObj('GithubApiService', ['getUserRepoData']); 
      activatedRoute = new ActivatedRouteStub();
        
      const stubValue = of({ name: "some data" });
      githubApiServ.getUserRepoData.and.returnValue(stubValue);
      
      TestBed.configureTestingModule({      
        declarations: [ GithubUserRepoComponent,RouterLinkDirectiveStub],      
        providers: [{provide: GithubApiService, useValue:githubApiServ},{provide: ActivatedRoute, useValue:activatedRoute}]
      });
          
    });
  
    it('should create', () => {              
      fixture = TestBed.createComponent(GithubUserRepoComponent);
      component = fixture.componentInstance;
      let githubService=TestBed.get(GithubApiService);
      expect(component).toBeTruthy();
    });
  
    it('should get send data to service from Activated Route\'s parent url', () => {           
      fixture = TestBed.createComponent(GithubUserRepoComponent);
      component = fixture.componentInstance;
      let githubService=TestBed.get(GithubApiService);
      let actRoute=TestBed.get(ActivatedRoute);
      let stubbedUrlSegment= [{path:'mojombo'}] as Array<UrlSegment>;
      actRoute.parent.setParentUrl(stubbedUrlSegment);      
      expect(githubService.getUserRepoData.calls.mostRecent().args[0]).toContain("mojombo");
  });
    
  });
  