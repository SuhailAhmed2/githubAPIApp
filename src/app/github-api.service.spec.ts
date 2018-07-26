import { TestBed, inject } from '@angular/core/testing';

import { GithubApiService } from './github-api.service';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { not } from '@angular/compiler/src/output/output_ast';



describe('GithubApiService', () => {

  let httpServiceSpy: jasmine.SpyObj<HttpClient>;
  let githubApiServ: GithubApiService;


  beforeEach(() => {

    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [GithubApiService, { provide: HttpClient, useValue: spy }]
    });

    githubApiServ = TestBed.get(GithubApiService);
    httpServiceSpy = TestBed.get(HttpClient);

  });

  it('#getUsersData should return stubbed value from a spy', () => {
    const stubValue = of({ name: "suhail" });
    httpServiceSpy.get.and.returnValue(stubValue);
    //spyOn(Observable.prototype,'pipe').and.returnValue(of('suhail'));
    githubApiServ.getUsersData().subscribe(res => {
      expect(res.name).toEqual('suhail');
    });
  });

  it('#getUsersData should throw error stubbed value from a spy', () => {
    const stubValue = throwError("invalid data");
    httpServiceSpy.get.and.returnValue(stubValue);
    //spyOn(Observable.prototype,'pipe').and.returnValue(of('suhail'));
    githubApiServ.getUsersData().subscribe(res => {
      fail('expected an error not data');
    },
      err => {
        expect(err).toBe("Server side error. Please try again")
      });
  });

  it('#getUsersData should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
   
    httpServiceSpy.get.and.returnValue(throwError(errorResponse));
   
    githubApiServ.getUsersData().subscribe(res => {      
      fail('expected an error not data');
    },
      err => {
        expect(err).toBe("Server side error. Please try again")
      });
  });
});
