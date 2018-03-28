import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarerPaidSubmittedComponent } from './carer-paid-submitted.component';

describe('CarerPaidSubmittedComponent', () => {
  let component: CarerPaidSubmittedComponent;
  let fixture: ComponentFixture<CarerPaidSubmittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarerPaidSubmittedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarerPaidSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
