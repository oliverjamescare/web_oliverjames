import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPopupListComponent } from './calendar-popup-list.component';

describe('CalendarPopupListComponent', () => {
  let component: CalendarPopupListComponent;
  let fixture: ComponentFixture<CalendarPopupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarPopupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarPopupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
