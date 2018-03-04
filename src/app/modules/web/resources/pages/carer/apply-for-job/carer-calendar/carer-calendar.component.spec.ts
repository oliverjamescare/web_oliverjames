import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarerCalendarComponent } from './carer-calendar.component';

describe('CarerCalendarComponent', () => {
  let component: CarerCalendarComponent;
  let fixture: ComponentFixture<CarerCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarerCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarerCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
