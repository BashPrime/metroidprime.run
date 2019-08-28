import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomizerArticleComponent } from './randomizer-article.component';

describe('RandomizerArticleComponent', () => {
  let component: RandomizerArticleComponent;
  let fixture: ComponentFixture<RandomizerArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomizerArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomizerArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
