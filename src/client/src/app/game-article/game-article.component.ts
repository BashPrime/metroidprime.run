import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { GameArticle, SectionType } from '../../../../common/models/gameArticle';

@Component({
  selector: 'app-game-article',
  templateUrl: './game-article.component.html',
  styleUrls: ['./game-article.component.scss']
})
export class GameArticleComponent implements OnInit {
  private article: GameArticle;
  private readonly types = {
    markdown: SectionType.MARKDOWN,
    youtube: SectionType.YOUTUBE
  };

  constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.article = this.route.snapshot.data.article;

      if (!this.article) {
        this.router.navigate(['/404']);
      }
    });
  }

  getArticle() {
    return this.article;
  }

  getTypes() {
    return this.types;
  }

  getTrustedYouTubeUrl(id: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + id);
  }
}
