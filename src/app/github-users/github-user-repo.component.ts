import { Component, OnInit } from '@angular/core';
import { GithubApiService } from '../github-api.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-github-user-repo',
  templateUrl: './github-user-repo.component.html'
  //styleUrls: ['./github-user-repo.component.css']
})
export class GithubUserRepoComponent implements OnInit {
  githubUserRepoData$:Observable<any>;

  constructor(private ghApi:GithubApiService, private actRoute: ActivatedRoute) {  
    /*
    Using GithubApiService to fetch all data related to repository of user and save it to our observable
    We send our parent route name to fetch data. 
    To extract parent route we used ActivatedRoute
    */
    this.githubUserRepoData$= new Observable();
    this.actRoute.parent.url.subscribe(res=>{      
      this.githubUserRepoData$=this.ghApi.getUserRepoData(res[0].path);
    });   
  }

  ngOnInit() {
  }

}
