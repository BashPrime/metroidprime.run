import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { GameArticle, SectionType } from '../model/game-article';
import { PermissionService } from '../services/permission.service';

@Component({
  selector: 'app-game-article',
  templateUrl: './game-article.component.html',
  styleUrls: ['./game-article.component.scss']
})
export class GameArticleComponent implements OnInit {
  protected article: GameArticle;
  protected readonly UPDATE_ARTICLE = 'game.updateArticle';
  types = {
    markdown: SectionType.MARKDOWN,
    youtube: SectionType.YOUTUBE
  };

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private permissionService: PermissionService) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      const article = this.route.snapshot.data.article.data;
      this.article = article as GameArticle;
    });
  }

  getTrustedYouTubeUrl(id: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + id);
  }

  canEditArticle() {
    return this.permissionService.hasPermission(this.UPDATE_ARTICLE, true);
  }
}
