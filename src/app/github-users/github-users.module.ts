import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';


import { GithubUsersComponent }    from './github-users.component';
import { GithubUsersRoutingModule } from './github-users-routing.module';
import { GithubApiService } from '../github-api.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { GithubUserDetailComponent } from './github-user-detail.component';
import { GithubUserRepoComponent } from './github-user-repo.component';
import { NameFilterPipe } from '../name-filter.pipe';
import { FavouritesManagementService } from '../favourites-management.service';
import { GithubFavouriteUsersComponent } from './github-favourite-users.component';
import { FavouritePipe } from '../favourite.pipe';

@NgModule({
  imports: [
    BrowserModule, 
    HttpClientModule,  
    GithubUsersRoutingModule
    ],
  declarations: [
    GithubUsersComponent,
    GithubUserDetailComponent,
    GithubUserRepoComponent,
    GithubFavouriteUsersComponent,
    NameFilterPipe,
    FavouritePipe
  ],
  providers: [GithubApiService,FavouritesManagementService]
})
export class GithubUsersModule {}
