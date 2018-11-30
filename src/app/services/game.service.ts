import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class GameService {
  constructor(private http: HttpClient) {}

  getAllGames() {
    return this.http.get('/api/games');
  }
}
