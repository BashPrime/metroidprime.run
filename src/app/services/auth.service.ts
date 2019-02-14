import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../model/user';
import { PermissionService } from './permission.service';

@Injectable()
export class AuthService {
  authToken: any;
  user: User;
  authenticationChange: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService,
    private permissionService: PermissionService
  ) {
    this.authToken = localStorage.getItem('id_token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.setLoggedInUser(user);
    } else {
      this.permissionService.setPermissions(null);
    }
  }

  authenticateUser(user) {
    return this.http.post('/api/authenticate', user);
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.setLoggedInUser(user);
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
    this.permissionService.setPermissions(null);
  }

  getLoggedInUser() {
    return this.user;
  }

  setLoggedInUser(user) {
    this.user = user;
    this.permissionService.resetPermissions();
  }
}
