import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarerAvailableJobsListComponent } from './carer-available-jobs-list.component';

describe('CarerAvailableJobsListComponent', () => {
  let component: CarerAvailableJobsListComponent;
  let fixture: ComponentFixture<CarerAvailableJobsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarerAvailableJobsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarerAvailableJobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
