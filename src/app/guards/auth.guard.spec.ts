import { TestBed, inject } from '@angular/core/testing';

import { Auth.GuardService } from './auth.guard.service';

describe('Auth.GuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth.GuardService]
    });
  });

  it('should be created', inject([Auth.GuardService], (service: Auth.GuardService) => {
    expect(service).toBeTruthy();
  }));
});
