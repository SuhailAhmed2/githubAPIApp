import { TestBed, inject } from '@angular/core/testing';

import { GithubApiService } from './github-api.service';

import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';



fdescribe('GithubApiService', () => {

  let httpServiceSpy: jasmine.SpyObj<HttpClient>;
  let githubApiServ: GithubApiService;


  beforeEach(() => {

    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [GithubApiService,{provide:HttpClient,useValue:spy}]
    });

    githubApiServ = TestBed.get(GithubApiService);
    httpServiceSpy = TestBed.get(HttpClient);

  });

  it('#getUsersData should return stubbed value from a spy', () => {
    const stubValue = of('stub value');
    httpServiceSpy.get.and.returnValue(stubValue);

    const pipeSpy = jasmine.createSpyObj('Observable', ['pipe']);
    pipeSpy.pipe.and.returnValue('pipe value');

    githubApiServ.getUsersData().subscribe(res=>{

      expect(res)
      .toBe('stub value', 'service returned stub value');

    });
  
    
    // expect(httpServiceSpy.get.calls.count())
    //   .toBe(1, 'spy method was called once');
    // expect(httpServiceSpy.get.calls.mostRecent().returnValue)
    //   .toBe(stubValue);
  });

 
});
