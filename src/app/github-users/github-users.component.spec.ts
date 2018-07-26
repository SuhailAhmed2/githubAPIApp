import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubUsersComponent } from './github-users.component';
import { GithubApiService } from '../github-api.service';
import { ActivatedRoute } from '@angular/router';
import { Pipe, Component, Directive, Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';


@Pipe({
  name: 'nameFilter'
})
class NameFilterStubPipe{}

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent {}

@Component({selector:'app-github-favourite-users', template:''})
class GithubFavStubComponent{
  @Input() githubFavUsers: Array<any>;
  @Output() removeUser:EventEmitter<any>;
}

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('GithubUsersComponent', () => {
  let component: GithubUsersComponent;
  let fixture: ComponentFixture<GithubUsersComponent>;

  beforeEach(() => {
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['someMethod']);
    const githubApiServ = jasmine.createSpyObj('GithubApiService', ['getUsersData']); 
    
    const stubValue = of({ name: "some data" });
    githubApiServ.getUsersData.and.returnValue(stubValue);
    
    TestBed.configureTestingModule({      
      declarations: [ GithubUsersComponent,NameFilterStubPipe,RouterOutletStubComponent,RouterLinkDirectiveStub,GithubFavStubComponent],      
      providers: [{provide: GithubApiService, useValue:githubApiServ},{provide: ActivatedRoute, useValue:activatedRouteSpy}]
    });
    fixture = TestBed.createComponent(GithubUsersComponent);
    component = fixture.componentInstance;
    let githubService=TestBed.get(GithubApiService);
  });

  it('should create', () => {    
    expect(component).toBeTruthy();
  });

  it('should add a user to its favourites list', () => {
    let user={login:"test user"};
    expect(component.favouriteList.length).toBe(0);
    expect(component.favUsers.length).toBe(0);
    component.addToFavourite(user.login,user);
    expect(component.favouriteList.length).toBe(1);
    expect(component.favUsers.length).toBe(1);
    expect(component.favouriteList[0]).toBe("test user");
    expect(component.favUsers[component.favUsers.length-1].login).toBe("test user");
  });

  it('should throw an error when a same user is added to the favourite users list', () => {
    let user={login:"test user"};
    component.addToFavourite(user.login,user);
    expect(()=>component.addToFavourite(user.login,user)).toThrowError("cannot add same username again loginName:test user");
  });

  it('should remove a user from the favourite list', () => {
    let user={login:"test user"};
    component.addToFavourite(user.login,user);
    expect(component.favouriteList.length).toBe(1);
    expect(component.favUsers.length).toBe(1);
    component.removeFromFavourite(user,user.login);
    expect(component.favouriteList.length).toBe(0);
    expect(component.favUsers.length).toBe(0);
  });

  it('should throw an exception when user not in favourite list is removed', () => {
    let user={login:"test user"};
    expect(()=>component.removeFromFavourite(user,user.login)).toThrowError(/username was not found/);    
  });

  it('should throw an exception when user without githubFav property is removed from favourite list', () => {
    let user={login:"test user"};
    component.addToFavourite(user.login,user);
    expect(component.favouriteList.length).toBe(1);
    expect(component.favUsers.length).toBe(1);
    expect(user['githubAppFav']).toBeTruthy();
    let userWithNoFav={login:"test user"};
    expect(()=>component.removeFromFavourite(userWithNoFav,userWithNoFav.login)).toThrowError(/username was added but githubAppFav/);    
  });

  
});
