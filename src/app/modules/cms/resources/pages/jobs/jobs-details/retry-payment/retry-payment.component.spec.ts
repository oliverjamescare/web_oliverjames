import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetryPaymentComponent } from './retry-payment.component';

describe('RetryPaymentComponent', () => {
  let component: RetryPaymentComponent;
  let fixture: ComponentFixture<RetryPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetryPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetryPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
