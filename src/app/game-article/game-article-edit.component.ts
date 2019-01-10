import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { GameArticle } from '../model/game-article';

@Component({
  selector: 'app-game-article-edit',
  templateUrl: './game-article-edit.component.html',
  styleUrls: ['./game-article-edit.component.scss']
})
export class GameArticleEditComponent implements OnInit {
  article: GameArticle = new GameArticle();
  articleForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.articleForm = new FormBuilder().group({
      title: ['']
    })
  }

}
