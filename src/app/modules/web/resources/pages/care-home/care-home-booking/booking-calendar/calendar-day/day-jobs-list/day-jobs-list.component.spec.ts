import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayJobsListComponent } from './day-jobs-list.component';

describe('DayJobsListComponent', () => {
  let component: DayJobsListComponent;
  let fixture: ComponentFixture<DayJobsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayJobsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayJobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
