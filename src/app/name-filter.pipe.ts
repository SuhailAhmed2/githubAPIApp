import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    /*
      Custom pipe used for filtering users list based on user enttered search words
    */
   if(args!==undefined && args!=='')
   {
    let  filteredList = value.filter(user => {
      let name =new RegExp(args);
      return name.test(user.login)
    });   
    if(filteredList.length==0)
    {
      return [{"github_app_empty_result":true}];
    }
    else
    {
      return filteredList;
    }
  }
  else
  {
    return value;
  }
  }

}
