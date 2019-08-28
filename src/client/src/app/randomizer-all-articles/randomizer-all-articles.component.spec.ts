import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomizerAllArticlesComponent } from './randomizer-all-articles.component';

describe('RandomizerAllArticlesComponent', () => {
  let component: RandomizerAllArticlesComponent;
  let fixture: ComponentFixture<RandomizerAllArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomizerAllArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomizerAllArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
