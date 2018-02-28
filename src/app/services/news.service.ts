import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class NewsService {

  constructor(private http: HttpClient) { }

  getAllNews() {
    return this.http.get('/api/news');
  }

}
