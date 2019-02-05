import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { GameArticle, SectionType } from '../model/game-article';
import { LoggedInUser } from '../model/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-game-article',
  templateUrl: './game-article.component.html',
  styleUrls: ['./game-article.component.scss']
})
export class GameArticleComponent implements OnInit {
  protected article: GameArticle;
  protected user: LoggedInUser;
  protected readonly UPDATE_ARTICLE = 'game.updateArticle';
  types = {
    markdown: SectionType.MARKDOWN,
    youtube: SectionType.YOUTUBE
  };

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getLoggedInUser();
    this.route.params.subscribe(() => {
      const article = this.route.snapshot.data.article.data;
      this.article = article as GameArticle;
    });
  }

  getTrustedYouTubeUrl(id: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + id);
  }
}
