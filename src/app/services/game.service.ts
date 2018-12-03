import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class GameService {
  constructor(private http: HttpClient) {}

  getAllGames() {
    return this.http.get('/api/games');
  }

  getGameByAbbreviatedName(abbreviation: string) {
    return this.http.get('/api/games/' + abbreviation);
  }

  getArticlesForGame(abbreviation: string) {
    return this.http.get('/api/games/' + abbreviation + '/articles');
  }

  getSingleArticleForGame(abbreviation: string, articleName: string) {
    return this.http.get('/api/games/' + abbreviation + '/articles/' + articleName);
  }
}
