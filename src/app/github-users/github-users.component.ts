import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GithubApiService } from '../github-api.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FavouritesManagementService } from '../favourites-management.service';
import { logging } from 'protractor';

@Component({
  selector: 'app-github-users',
  templateUrl: './github-users.component.html',
  styleUrls: ['./github-users.component.css']
})
export class GithubUsersComponent implements OnInit, AfterViewInit {
  githubUsers:Array<any>;
  githubUsersData$:Observable<any>;
  favouriteList:Array<any>;
  favUsers:Array<any>;

  constructor(private ghApi:GithubApiService, public actRoute: ActivatedRoute) { 
    /*
      using GithubApiService to get all users data and assigning to our observable
     */
    this.favouriteList=[];
    this.favUsers=[];
    this.githubUsers=[];
    this.githubUsersData$ = new Observable();
    this.githubUsersData$=this.ghApi.getUsersData(); 
    this.githubUsersData$.subscribe(res=>{
      this.githubUsers=res;
    },
  err=>{

  });
  }

  ngOnInit() {
    console.log("github-users-component ngOnInit");
  }

  ngAfterViewInit() {
    console.log("github-users-component ngAfterViewInit");
  }

  addToFavourite(userLoginName:any,user:any)
  {
    if(this.favouriteList.findIndex((ele)=>ele==userLoginName) ==-1)
    { 
      this.favouriteList.push(userLoginName);      
      this.favUsers.push(user);
      user['githubAppFav']=true;
    }
    else{
      //throw error
    }            

  }
  removeFromFavourite(user:any,userLoginName?:any)
  {
    //console.log("remove from favourite called");
    let loginName:string;
    if(!userLoginName)
    {
      loginName=user.login;
    }
    else{
      loginName=userLoginName;
    }
    let userIndex=this.favouriteList.findIndex((ele)=>ele==loginName);
    if( userIndex !=-1)
    { 
      this.favouriteList.splice(userIndex,1);
      this.favUsers.splice(userIndex,1);
      if(user['githubAppFav'])
      {
        delete user['githubAppFav'];
      }
      else{
        //throw error
      }
    }
    else
    {
      //throw error 
    }
  }

}
