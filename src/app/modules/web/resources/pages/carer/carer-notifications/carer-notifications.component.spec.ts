import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarerNotificationsComponent } from './carer-notifications.component';

describe('CarerNotificationsComponent', () => {
  let component: CarerNotificationsComponent;
  let fixture: ComponentFixture<CarerNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarerNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarerNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
