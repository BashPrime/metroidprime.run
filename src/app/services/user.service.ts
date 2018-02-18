import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(username: string) {
    return this.http.get('/api/users/' + username);
  }

  registerUser(user) {
    return this.http.post('/api/users/register', user);
  }

  lookupUser(username: string) {
    const reqBody = {username: username};
    return this.http.post('/api/users/userexists', reqBody);
  }

  lookupEmail(email: string) {
    const reqBody = {email: email};
    return this.http.post('/api/users/emailexists', reqBody);
  }

}
