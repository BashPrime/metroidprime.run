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
  articlesByCategory: any;
  constructor(private gameService: GameService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getGame();
    });
  }

  private getGame() {
    this.game = this.route.snapshot.data['game'].data as Game;
    if (Object.keys(this.game).length === 0) {
      this.router.navigate(['/404']);
    }
  }

  private getArticlesForGameByCategory(abbreviation: string) {
    this.gameService.getArticlesForGame(abbreviation).subscribe(res => {
      const articles = res['data'];
      const categories = [];

      // Get distinct categories
      for (const article of articles) {
        if (!categories.find(category => category.id === article.category.id)) {
          categories.push(JSON.parse(JSON.stringify(article.category)));
        }
      }

      // Sort categories and add articles array to each category item
      categories.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        }
        return 0;
      }).map(category => {
        category.articles = [];
        return category;
      });

      // Add articles to their categories
      for (const article of articles) {
        categories.find(category => category.id === article.category.id).articles.push(article);
      }

      // Finally, sort articles in each category in alphabetical order
      for (const category of categories) {
        category.articles.sort((articleA, articleB) => {
          if (articleA.title < articleB.title) {
            return -1;
          } else if (articleA.title > articleB.title) {
            return 1;
          }
          return 0;
        });
      }

      this.articlesByCategory = categories;
    });
  }
}
