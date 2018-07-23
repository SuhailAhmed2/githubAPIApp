import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GithubUsersComponent } from './github-users.component';
import { LoginService } from '../login.service';
import { GithubUserDetailComponent } from './github-user-detail.component';
import { GithubUserRepoComponent } from './github-user-repo.component';


const githubUsersRoutes: Routes = [
    {
      path: 'github-users',
      component: GithubUsersComponent,
      canActivate: [LoginService],
      children: [
      {
          path: 'user-details',
          //component: GithubUserDetailComponent,
           children: [
             {
               path: ':username',
               component: GithubUserDetailComponent,
               children:[
                {
                  path:'user-repo',
                  component: GithubUserRepoComponent
                }
               ]
             }
            // {
            //   path: '',
            //   component: CrisisCenterHomeComponent
            // }
          ]          
        }        
      ]
    }
  ];

@NgModule({
  imports: [
    RouterModule.forChild(githubUsersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GithubUsersRoutingModule { }


