import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarerCalendarPopupComponent } from './carer-calendar-popup.component';

describe('CarerCalendarPopupComponent', () => {
  let component: CarerCalendarPopupComponent;
  let fixture: ComponentFixture<CarerCalendarPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarerCalendarPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarerCalendarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
