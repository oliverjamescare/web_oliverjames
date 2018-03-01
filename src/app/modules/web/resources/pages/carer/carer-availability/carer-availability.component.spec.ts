import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarerAvailabilityComponent } from './carer-availability.component';

describe('CarerAvailabilityComponent', () => {
  let component: CarerAvailabilityComponent;
  let fixture: ComponentFixture<CarerAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarerAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarerAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
