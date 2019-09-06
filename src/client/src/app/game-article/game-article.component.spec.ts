import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameArticleComponent } from './game-article.component';

describe('GameArticleComponent', () => {
  let component: GameArticleComponent;
  let fixture: ComponentFixture<GameArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
