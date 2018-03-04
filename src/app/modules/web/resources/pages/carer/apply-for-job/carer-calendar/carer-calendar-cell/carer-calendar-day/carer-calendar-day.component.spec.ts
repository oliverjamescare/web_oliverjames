import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarerCalendarDayComponent } from './carer-calendar-day.component';

describe('CarerCalendarDayComponent', () => {
  let component: CarerCalendarDayComponent;
  let fixture: ComponentFixture<CarerCalendarDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarerCalendarDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarerCalendarDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
