import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarerAvailableJobsComponent } from './carer-available-jobs.component';

describe('CarerAvailableJobsComponent', () => {
  let component: CarerAvailableJobsComponent;
  let fixture: ComponentFixture<CarerAvailableJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarerAvailableJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarerAvailableJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
