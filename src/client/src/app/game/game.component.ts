import { Component, OnInit } from '@angular/core';

import * as config from '../../assets/resources/config.json';
import { Game } from '../../../../common/models/game';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  private game: Game;
  private tabs: GameTab[] = [
    { name: 'Overview', route: '' },
    { name: 'Articles', route: 'articles' },
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.game = this.route.snapshot.data.game;

      if (!this.game) {
        this.router.navigate(['/404']);
      }
    });
  }

  getGame(): Game {
    return this.game;
  }

  getTabs(): any[] {
    return this.tabs;
  }

  get cdnUrl(): string {
    return config.cdnUrl;
  }

  get heroStyle() {
    return {
      'background-image': 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("' + this.cdnUrl + 'games/banners/' + this.game.banner + '")'
    }
  }
}

class GameTab {
  name: string;
  route: string;
}
