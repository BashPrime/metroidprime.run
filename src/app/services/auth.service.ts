import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  authenticationChange: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {
    this.authToken = localStorage.getItem('id_token');
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  authenticateUser(user) {
    return this.http.post('/api/authenticate', user);
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    this.authenticationChange.next(true);
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  get loggedIn() {
    if (!this.authToken) {
      return false;
    }

    return !this.jwtHelperService.isTokenExpired(this.authToken);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.authenticationChange.next(false);
  }

}
