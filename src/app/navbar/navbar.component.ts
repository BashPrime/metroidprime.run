import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showNav = false;
  user: any;
  _authSub: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this._authSub = this.authService.authenticationChange.subscribe(loggedIn => {
      this.user = loggedIn ? this.getUserFromAuthService() : undefined;
    })
  }

  ngOnInit() {
    this.user = this.getUserFromAuthService();
  }

  ngOnDestroy() {
    this._authSub.unsubscribe();
  }

  getUserFromAuthService() {
    return this.authService.loggedIn ? this.authService.user : undefined;
  }

  onLogoutClicked() {
    this.authService.logout();
    this.router.navigate(['/login', {loggedOut: true}]);
  }

}
