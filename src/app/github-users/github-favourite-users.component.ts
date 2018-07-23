import { Component, OnInit, Input, OnChanges, SimpleChange, AfterViewInit, DoCheck, Output, EventEmitter } from '@angular/core';
import { FavouritesManagementService } from '../favourites-management.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-github-favourite-users',
  templateUrl: './github-favourite-users.component.html'
  //styleUrls: ['./github-favourite-users.component.css']
})
export class GithubFavouriteUsersComponent	
{
  @Input() githubFavUsers:Array<any>;
  @Output() removeUser = new EventEmitter<any>();

  removeFromFav(user:any) {
    this.removeUser.emit(user);    
  }
}
