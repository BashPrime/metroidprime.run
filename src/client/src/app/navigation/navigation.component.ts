import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

import { Game } from '../../../../common/models/game';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  private showNav: boolean = false;
  private games: Game[];
  faDiscord = faDiscord;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.setGames(this.route.snapshot.data.games);
    });
  }

  getGames() {
    return this.games;
  }

  setGames(games: Game[]) {
    this.games = games;
  }

  getShowNav() {
    return this.showNav;
  }

  setShowNav(showNav: boolean) {
    this.showNav = showNav;
  }
}
