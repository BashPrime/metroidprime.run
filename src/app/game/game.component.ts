import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Game, GameTab } from '../model/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game: Game;
  articlesByCategory: any;
  tabs: GameTab[];
  private readonly defaultTabs: GameTab[] = [
    { text: 'Overview', value: 'overview' }
  ];
  readonly overviewTab = 'overview';
  selectedTab = this.overviewTab;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.tabs = this.defaultTabs;
      this.selectedTab = this.overviewTab;
      this.getGame();
      this.getArticlesForGameByCategory();
    });
  }

  private getGame() {
    this.game = this.route.snapshot.data.game.data as Game;
    if (Object.keys(this.game).length === 0) {
      this.router.navigate(['/404']);
    }
  }

  private getArticlesForGameByCategory() {
    // Clear non-overview tabs if needed
    if (this.tabs.length > 1) {
    this.tabs = this.tabs.filter(tab => tab.value === this.overviewTab);

    }
    const articles = this.route.snapshot.data.articles.data;
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

    // Push categories to tabstrip
    for (const category of categories) {
      this.tabs.push({ text: category.name, value: category.abbreviation });
    }

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
  }

  getCategoryArticles(abbr: string) {
    return this.articlesByCategory.find(category => category.abbreviation === abbr).articles;
  }
}
