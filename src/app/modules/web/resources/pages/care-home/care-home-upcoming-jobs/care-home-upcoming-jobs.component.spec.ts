import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareHomeUpcomingJobsComponent } from './care-home-upcoming-jobs.component';

describe('CareHomeUpcomingJobsComponent', () => {
  let component: CareHomeUpcomingJobsComponent;
  let fixture: ComponentFixture<CareHomeUpcomingJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareHomeUpcomingJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareHomeUpcomingJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
