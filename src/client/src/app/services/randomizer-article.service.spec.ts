import { TestBed } from '@angular/core/testing';

import { RandomizerArticleService } from './randomizer-article.service';

describe('RandomizerArticleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomizerArticleService = TestBed.get(RandomizerArticleService);
    expect(service).toBeTruthy();
  });
});
