import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RandomizerArticleService {
  constructor(private http: HttpClient) { }

  getAllArticlesForRandomizer(randomizerAbbreviation: string) {
    return this.http.get('/api/randomizers/' + randomizerAbbreviation + '/articles');
  }

  getOneArticleForRandomizer(articleSlug: string, randomizerAbbreviation: string) {
    return this.http.get('/api/randomizers/' + randomizerAbbreviation + '/articles/' + articleSlug);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AllRandomizerArticlesResolve implements Resolve<Object> {
  constructor(private randomizerArticleService: RandomizerArticleService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.randomizerArticleService.getAllArticlesForRandomizer(route.parent.params['randomizer']);
  }
}

@Injectable({
  providedIn: 'root'
})
export class OneRandomizerArticleResolve implements Resolve<Object> {
  constructor(private randomizerArticleService: RandomizerArticleService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.randomizerArticleService.getOneArticleForRandomizer(route.params['article'], route.parent.params['randomizer']);
  }
}
