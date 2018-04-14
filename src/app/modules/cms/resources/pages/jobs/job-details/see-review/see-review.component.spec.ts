import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeReviewComponent } from './see-review.component';

describe('SeeReviewComponent', () => {
  let component: SeeReviewComponent;
  let fixture: ComponentFixture<SeeReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
