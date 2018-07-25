import { TestBed, inject } from '@angular/core/testing';

import { GithubApiService } from './github-api.service';

import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { not } from '@angular/compiler/src/output/output_ast';



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

    console.log(new Observable());
    const stubValue = of({name:"suhail"});
    httpServiceSpy.get.and.returnValue(stubValue);

    //spyOn(Observable.prototype,'pipe').and.returnValue(of('suhail'));

    githubApiServ.getUsersData().subscribe(res=>{
      expect(res.name).toEqual('suhail');
    });
    
    });
  
    
    // expect(httpServiceSpy.get.calls.count())
    //   .toBe(1, 'spy method was called once');
    // expect(httpServiceSpy.get.calls.mostRecent().returnValue)
    //   .toBe(stubValue);
 
});
