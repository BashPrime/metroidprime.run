import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameArticleService {
  constructor(private http: HttpClient) { }

  getAllArticlesForGame(gameAbbreviation: string) {
    return this.http.get('/api/games/' + gameAbbreviation + '/articles');
  }

  getOneArticleForGame(articleSlug: string, gameAbbreviation: string) {
    return this.http.get('/api/games/' + gameAbbreviation + '/articles/' + articleSlug);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AllGameArticlesResolve implements Resolve<Object> {
  constructor(private GameArticleService: GameArticleService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.GameArticleService.getAllArticlesForGame(route.parent.params['game']);
  }
}

@Injectable({
  providedIn: 'root'
})
export class OneGameArticleResolve implements Resolve<Object> {
  constructor(private GameArticleService: GameArticleService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.GameArticleService.getOneArticleForGame(route.params['article'], route.parent.params['game']);
  }
}
