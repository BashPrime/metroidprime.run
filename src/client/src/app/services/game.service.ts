import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private http: HttpClient) { }

  getAllGames() {
    return this.http.get('/api/games');
  }

  getGameByAbbreviation(abbreviation: string) {
    return this.http.get('/api/games/' + abbreviation);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AllGamesResolve implements Resolve<Object> {
  constructor(private gameService: GameService) { }

  resolve() {
    return this.gameService.getAllGames();
  }
}

@Injectable({
  providedIn: 'root'
})
export class SingleGameResolve implements Resolve<Object> {
  constructor(private gameService: GameService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.gameService.getGameByAbbreviation(route.params['game']);
  }
}
