import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-article',
  templateUrl: './game-article.component.html',
  styleUrls: ['./game-article.component.scss']
})
export class GameArticleComponent implements OnInit {
  article: any;
  constructor(private gameService: GameService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.parent.params.subscribe(parentParams => {
      this.route.params.subscribe(params => {
        this.getArticle(parentParams['game'], params['article']);
      });
    });
  }

  getArticle(game: string, article: string) {
    this.gameService.getSingleArticleForGame(game, article).subscribe(res => {
      this.article = res['data'];
    });
  }

}
