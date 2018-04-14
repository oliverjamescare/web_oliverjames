import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareHomePastJobsComponent } from './care-home-past-jobs.component';

describe('CareHomePastJobsComponent', () => {
  let component: CareHomePastJobsComponent;
  let fixture: ComponentFixture<CareHomePastJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareHomePastJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareHomePastJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
