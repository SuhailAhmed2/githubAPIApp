import { NameFilterPipe } from './name-filter.pipe';

fdescribe('NameFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new NameFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('search for a user, return that user which has the characters in the sequence', () => {
    const pipe = new NameFilterPipe();
    let users=[{login:"mojombo"},{login:"ahmed"},{login:"rahul"}];
    let result=pipe.transform(users,'om');
    expect(result.length).toBe(1);
    expect(result[0].login).toEqual("mojombo");    
  });

  it('search for a user which has the characters but not in sequence. It returns result with custom object which represents empty result. ', () => {
    const pipe = new NameFilterPipe();
    let users=[{login:"mojombo"},{login:"ahmed"},{login:"rahul"}];
    let result=pipe.transform(users,'em');    
    expect(result.length).toBe(1);
    expect(result[0].hasOwnProperty("github_app_empty_result")).toBeTruthy();
  });

  it('should return same result as provided as input, when search value is not provided', () => {
    const pipe = new NameFilterPipe();
    let users=[{login:"mojombo"},{login:"ahmed"},{login:"rahul"}];
    let result=pipe.transform(users);    
    expect(result.length).toBe(3);    
  });
});
