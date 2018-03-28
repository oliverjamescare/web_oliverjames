import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareHomeUpcomingJobsTabComponent } from './care-home-upcoming-jobs-tab.component';

describe('CareHomeUpcomingJobsTabComponent', () => {
  let component: CareHomeUpcomingJobsTabComponent;
  let fixture: ComponentFixture<CareHomeUpcomingJobsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareHomeUpcomingJobsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareHomeUpcomingJobsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
