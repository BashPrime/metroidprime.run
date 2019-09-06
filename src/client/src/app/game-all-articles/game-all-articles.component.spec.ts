import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAllArticlesComponent } from './game-all-articles.component';

describe('GameAllArticlesComponent', () => {
  let component: GameAllArticlesComponent;
  let fixture: ComponentFixture<GameAllArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameAllArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAllArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
