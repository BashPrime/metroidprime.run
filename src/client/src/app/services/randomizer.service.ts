import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {
  constructor(private http: HttpClient) { }

  getAllRandomizers() {
    return this.http.get('/api/randomizers');
  }

  getRandomizerByAbbreviation(abbreviation: string) {
    return this.http.get('/api/randomizers/' + abbreviation);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AllRandomizersResolve implements Resolve<Object> {
  constructor(private randomizerService: RandomizerService) { }

  resolve() {
    return this.randomizerService.getAllRandomizers();
  }
}

@Injectable({
  providedIn: 'root'
})
export class SingleRandomizerResolve implements Resolve<Object> {
  constructor(private randomizerService: RandomizerService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.randomizerService.getRandomizerByAbbreviation(route.params['randomizer']);
  }
}
