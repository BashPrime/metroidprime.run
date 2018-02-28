import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  showNav = false;
  user: any;
  _authSub: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this._authSub = this.authService.authenticationChange.subscribe(loggedIn => {
      if (loggedIn) {
        this.getUserFromAuthService();
      } else {
        this.user = undefined;
      }
    });

    this.router.events.subscribe(val => {
      this.showNav = false;
    });
  }

  ngOnInit() {
    this.getUserFromAuthService();
  }

  ngOnDestroy() {
    this._authSub.unsubscribe();
  }

  getUserFromAuthService() {
    if (this.authService.loggedIn) {
      this.user = this.authService.user;
    } else {
      this.user = undefined;
      this.authService.logout();
    }
  }

  onLogoutClicked() {
    this.authService.logout();
    this.router.navigate(['/login', {loggedOut: true}]);
  }

}
