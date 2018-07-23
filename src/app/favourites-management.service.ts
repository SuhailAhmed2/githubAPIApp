import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class FavouritesManagementService {

  
  // Observable any sources
  private githubAnnouncedSource = new Subject<any>();
  private githubConfirmedSource = new Subject<any>();

  // Observable any streams
  githubAnnounced$ = this.githubAnnouncedSource.asObservable();
  githubConfirmed$ = this.githubConfirmedSource.asObservable();

  constructor() { 
  }

  // Service commands
  announceGithubData(githubData: any) {
    this.githubAnnouncedSource.next(githubData);
  }

  // confirmGithubData(child: any) {
  //   this.githubConfirmedSource.next(child);
  // }
  // set favourites(githubSingleUser:any)
  // {
  //   this.userGithubFavourite.push(githubSingleUser);
  // }
  // get favouritesList()
  // {
  //   return this.userGithubFavourite;
  // }

  // addData()
  // {
  //   this.userGithubFav$
  // }
}
