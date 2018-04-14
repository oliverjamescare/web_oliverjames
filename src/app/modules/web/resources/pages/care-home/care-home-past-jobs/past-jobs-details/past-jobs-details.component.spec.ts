import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastJobsDetailsComponent } from './past-jobs-details.component';

describe('PastJobsDetailsComponent', () => {
  let component: PastJobsDetailsComponent;
  let fixture: ComponentFixture<PastJobsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastJobsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastJobsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
