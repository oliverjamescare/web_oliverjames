import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingJobsTabComponent } from './upcoming-jobs-tab.component';

describe('UpcomingJobsTabComponent', () => {
  let component: UpcomingJobsTabComponent;
  let fixture: ComponentFixture<UpcomingJobsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingJobsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingJobsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
