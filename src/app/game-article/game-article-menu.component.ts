import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../model/game';
import { PermissionService } from '../services/permission.service';


@Component({
  selector: 'app-game-article-menu',
  templateUrl: './game-article-menu.component.html',
  styleUrls: ['./game-article-menu.component.scss']
})
export class GameArticleMenuComponent implements OnInit {
  articlesByCategory: any;
  private game: Game;
  private createArticlePerm = 'game.createArticle';

  constructor(private route: ActivatedRoute, private permissionService: PermissionService) { }

  ngOnInit() {
    this.getArticlesForGameByCategory();
    this.game = this.route.parent.snapshot.data.game.data;
  }

  private getArticlesForGameByCategory() {
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

    // Get article parameter from child route.
    const childRoute = this.route.firstChild;

    // If the article exists, get the category it belongs to and set it as selected
    if (childRoute) {
      const childArticle = childRoute.snapshot.data.article.data;
      if (childArticle) {
        this.articlesByCategory.find(category => category.abbreviation === childArticle.category.abbreviation).selected = true;
      }
    }
  }

  get hasChildRoute(): boolean {
    return this.route.firstChild ? true : false;
  }

  protected canCreateArticle() {
    const CREATE_ARTICLE = 'game.createArticle';
    return this.permissionService.hasPermission(CREATE_ARTICLE, true);
  }
}
