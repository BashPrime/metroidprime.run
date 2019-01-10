import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameArticleEditComponent } from './game-article-edit.component';

describe('GameArticleEditComponent', () => {
  let component: GameArticleEditComponent;
  let fixture: ComponentFixture<GameArticleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameArticleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameArticleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
