import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';

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

@Injectable()
export class GameResolve implements Resolve<Object> {
    constructor(private gameService: GameService, private router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot) {
        return this.gameService.getGameByAbbreviatedName(route.params['game']);
    }
}
