import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsItems = [];
  isLoading = false;
  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.newsService.getAllNews().subscribe(
      res => {
        if (res['success']) {
          this.newsItems = res['data'];
        }
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      }
    );
  }

}
