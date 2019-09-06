import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameArticle } from '../../../../common/models/gameArticle';

@Component({
  selector: 'app-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.scss']
})
export class GameOverviewComponent implements OnInit {
  private articles: GameArticle[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.articles = this.route.snapshot.data.articles;
    });
  }

  getArticles() {
    return this.articles;
  }

  getLatestArticles(limit: number = 10) {
    return this.articles.sort((a, b) => {
      return new Date(b.last_updated_date).getTime() - new Date(a.last_updated_date).getTime();
    }).slice(0, (limit - 1));
  }
}
