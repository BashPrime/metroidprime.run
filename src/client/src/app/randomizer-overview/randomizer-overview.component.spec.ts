import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomizerOverviewComponent } from './randomizer-overview.component';

describe('RandomizerOverviewComponent', () => {
  let component: RandomizerOverviewComponent;
  let fixture: ComponentFixture<RandomizerOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomizerOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomizerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
