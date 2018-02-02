import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCarerSummaryComponent } from './register-carer-summary.component';

describe('RegisterCarerSummaryComponent', () => {
  let component: RegisterCarerSummaryComponent;
  let fixture: ComponentFixture<RegisterCarerSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCarerSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCarerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
