import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GameService {
  private gameName = new BehaviorSubject<string>('');
  gameName$ = this.gameName.asObservable();

  setGameName(gameName: string) {
    this.gameName.next(gameName);
  }

}
