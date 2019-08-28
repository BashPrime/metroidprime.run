import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RandomizerArticle } from '../../../../common/models/randomizerArticle';

@Component({
  selector: 'app-randomizer-overview',
  templateUrl: './randomizer-overview.component.html',
  styleUrls: ['./randomizer-overview.component.scss']
})
export class RandomizerOverviewComponent implements OnInit {
  private articles: RandomizerArticle[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.articles = this.route.snapshot.data.articles;
    });
  }

  getLatestArticles() {
    return this.articles.sort((a, b) => {
      return new Date(b.last_updated_date).getTime() - new Date(a.last_updated_date).getTime();
    }).slice(0, 4);
  }
}
