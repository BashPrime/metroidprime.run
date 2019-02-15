import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  showNav = false;
  user: any;
  games: any;
  _authSub: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private gameService: GameService
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
    this.getGamesList();
    this.getUserFromAuthService();
  }

  ngOnDestroy() {
    this._authSub.unsubscribe();
  }

  getGamesList() {
    this.gameService.getAllGames().subscribe(res => {
      this.games = res['data'].sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        } else {
          return 0;
        }
      });
    });
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
  }

}
