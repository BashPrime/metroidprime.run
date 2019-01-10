import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game-article-menu',
  templateUrl: './game-article-menu.component.html',
  styleUrls: ['./game-article-menu.component.scss']
})
export class GameArticleMenuComponent implements OnInit {
  articlesByCategory: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getArticlesForGameByCategory();
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
  }
}
