import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameArticleMenuComponent } from './game-article-menu.component';

describe('GameArticleMenuComponent', () => {
  let component: GameArticleMenuComponent;
  let fixture: ComponentFixture<GameArticleMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameArticleMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameArticleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
