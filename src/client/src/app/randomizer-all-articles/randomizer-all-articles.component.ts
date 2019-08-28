import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RandomizerArticle } from '../../../../common/models/randomizerArticle';

@Component({
  selector: 'app-randomizer-all-articles',
  templateUrl: './randomizer-all-articles.component.html',
  styleUrls: ['./randomizer-all-articles.component.scss']
})
export class RandomizerAllArticlesComponent implements OnInit {
  private articles: RandomizerArticle[];
  private categoryFilters: { [key: string]: boolean } = {};
  objectKeys = Object.keys;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.articles = this.route.snapshot.data.articles;
    });
  }

  getArticles() {
    return this.articles;
  }

  getFilteredArticles() {
    return this.articles.filter(article => {
      if (!Object.keys(this.categoryFilters).find(key => this.categoryFilters[key])) {
        return this.articles;
      }

      return this.categoryFilters[article.category.abbreviation];
    });
  }

  initializeFilters() {
    this.categoryFilters = {};

    for (let category of this.getDistinctCategories()) {
      this.categoryFilters[category.abbreviation] = false;
    }
  }

  clearFilters() {
    for (let key of Object.keys(this.categoryFilters)) {
      this.categoryFilters[key] = false;
    }
  }

  getCategoryFilters() {
    return this.categoryFilters;
  }

  getDistinctCategories() {
    return this.articles.map(article => article.category).filter((category, index, selfCategories) => {
      const abbreviations = selfCategories.map(category => category.abbreviation);
      return abbreviations.indexOf(category.abbreviation) === index;
    });
  }
}
