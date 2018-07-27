import { GithubFavouriteUsersComponent } from "./github-favourite-users.component";

fdescribe("GithubFavouriteUsersComponent",()=>{
    let githubFavComp:GithubFavouriteUsersComponent;
    beforeEach(()=>{
        githubFavComp=new GithubFavouriteUsersComponent();
    });

    it("should emit same data as input",()=>{
        githubFavComp.githubFavUsers=[{login:"mojombo"},{login:"drek"}];
        githubFavComp.removeUser.subscribe(res=>{
            expect(res.hasOwnProperty('login')).toBeTruthy();            
            expect(res.login).toEqual("mojombo");            
        });
        githubFavComp.removeFromFav({login:"mojombo"});

    });
});