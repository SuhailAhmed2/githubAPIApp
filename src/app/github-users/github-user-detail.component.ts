import { Component, OnInit } from '@angular/core';
import { GithubApiService } from '../github-api.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-github-user-detail',
  templateUrl: './github-user-detail.component.html'
  //styleUrls: ['./github-user-detail.component.css']
})
export class GithubUserDetailComponent implements OnInit {
  githubUserData$:Observable<any>;
  sampleData:any;
  githubUser:any;

  constructor(private ghApi:GithubApiService, public actRoute: ActivatedRoute) {  
    /*
    Using GithubApiService to fetch all data related to a particular user and save it in our observable    
    */
    this.sampleData=[1];
    this.githubUser=null;
    this.githubUserData$= new Observable();
    this.actRoute.paramMap.subscribe(res=>{ 
      console.log("paramMap");     
      console.log(res);     
      this.githubUserData$=this.ghApi.getUserData(res['params'].username);
      this.githubUserData$.subscribe(res=>{
        this.githubUser= res;
      });
    });   
  }

  ngOnInit() {
  }

}
