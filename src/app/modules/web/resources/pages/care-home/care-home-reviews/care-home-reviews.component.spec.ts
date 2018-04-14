import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareHomeReviewsComponent } from './care-home-reviews.component';

describe('CareHomeReviewsComponent', () => {
  let component: CareHomeReviewsComponent;
  let fixture: ComponentFixture<CareHomeReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareHomeReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareHomeReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
