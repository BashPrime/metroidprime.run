import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Game, GameTab } from '../model/game';
import { PermissionService } from '../services/permission.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game: Game;
  tabs: GameTab[] = [
    { text: 'Articles', value: 'articles' }
  ];
  readonly config = require('../../assets/resources/config.json');

  constructor(private route: ActivatedRoute, private router: Router, private permissionService: PermissionService) {}

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.getGame();
      // this.router.navigate(['./' + this.tabs[0].value], { relativeTo: this.route });
    });
  }

  ngOnDestroy() {
    this.permissionService.setGame(null);
  }

  private getGame() {
    this.game = this.route.snapshot.data.game.data as Game;
    this.permissionService.setGame(this.game.abbreviation);
    if (Object.keys(this.game).length === 0) {
      this.router.navigate(['/404']);
    }
  }

  get heroStyle() {
    return {
      'background-image': 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + this.config.cdnUrl + 'games/banners/' + this.game.banner + ')'
    }
  }
}
