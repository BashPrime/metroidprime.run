import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { GameArticle, SectionType } from '../model/game-article';

@Component({
  selector: 'app-game-article',
  templateUrl: './game-article.component.html',
  styleUrls: ['./game-article.component.scss']
})
export class GameArticleComponent implements OnInit {
  article: GameArticle;
  types = {
    markdown: SectionType.MARKDOWN,
    youtube: SectionType.YOUTUBE
  };

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      const article = this.route.snapshot.data.article.data
      this.article = article as GameArticle;
    });
  }

  getTrustedYouTubeUrl(id: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + id);
  }
}
