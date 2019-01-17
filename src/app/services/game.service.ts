import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class GameService {
  constructor(private http: HttpClient) { }

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

  getArticleCategories() {
    return this.http.get('/api/articleCategories');
  }

  createArticle(game: string, newArticle: any) {
    return this.http.post('/api/games/' + game + '/create-article', newArticle);
  }
}

@Injectable()
export class GameResolve implements Resolve<Object> {
  constructor(private gameService: GameService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.gameService.getGameByAbbreviatedName(route.params['game']);
  }
}

@Injectable()
export class GameArticlesResolve implements Resolve<Object> {
  constructor(private gameService: GameService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.gameService.getArticlesForGame(route.parent.params['game']);
  }
}

@Injectable()
export class GameSingleArticleResolve implements Resolve<Object> {
  constructor(private gameService: GameService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.gameService.getSingleArticleForGame(route.parent.parent.params['game'], route.params['article']);
  }
}

@Injectable()
export class GameEditArticleResolve implements Resolve<Object> {
  constructor(private gameService: GameService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.gameService.getSingleArticleForGame(route.parent.params['game'], route.params['article']);
  }
}

@Injectable()
export class GameArticleCategoriesResolve implements Resolve<Object> {
  constructor(private gameService: GameService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.gameService.getArticleCategories();
  }
}
