import { TestBed } from '@angular/core/testing';

import { GameArticleService } from './game-article.service';

describe('GameArticleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameArticleService = TestBed.get(GameArticleService);
    expect(service).toBeTruthy();
  });
});
