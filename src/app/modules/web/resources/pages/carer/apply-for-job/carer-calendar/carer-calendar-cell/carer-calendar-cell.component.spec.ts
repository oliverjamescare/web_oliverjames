import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarerCalendarCellComponent } from './carer-calendar-cell.component';

describe('CarerCalendarCellComponent', () => {
  let component: CarerCalendarCellComponent;
  let fixture: ComponentFixture<CarerCalendarCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarerCalendarCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarerCalendarCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
