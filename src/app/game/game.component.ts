import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Game } from '../model/game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [GameService]
})
export class GameComponent implements OnInit {
  game: Game;
  constructor(private gameService: GameService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getGame(params['game']);
    });
  }

  private getGame(value: string) {
    this.gameService.getGameByValue(value).subscribe(res => {
      this.game = res['data'] as Game;
      if (Object.keys(this.game).length === 0) {
        this.router.navigate(['/404']);
      }
    });
  }
}
