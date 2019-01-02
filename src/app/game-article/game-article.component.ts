import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-article',
  templateUrl: './game-article.component.html',
  styleUrls: ['./game-article.component.scss']
})
export class GameArticleComponent implements OnInit {
  article: any;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.article = this.route.snapshot.data.article.data;
    });
  }
}
