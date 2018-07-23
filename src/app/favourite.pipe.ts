import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'favourite'
})
export class FavouritePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // console.log("value");
    // console.log(value);
    // console.log("args");
    // console.log(args);
    // value.forEach(ele => {
    //   args.forEach( e=>{
    //     if(ele.login==e)
    //     {
    //       ele['githubAppFav']=true;
    //     }
    //     else
    //     {
    //       if(ele.hasOwnProperty('githubAppFav'))
    //       {
    //         delete ele.githubAppFav;
    //       }
    //     }
    //   });
      
    // });
    console.log("came to favourite pipe");

    // let filterredResult=value.filter((ele)=>{
    //   if(args.find((e)=>e==ele.login) === undefined)
    //   {
    //     return false;
    //   }
    //   else
    //   {
    //     return true;
    //   }
    // });

    // console.log(filterredResult);
    return value;
  }

}
