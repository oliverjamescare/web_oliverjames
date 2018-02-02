import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarerDashboardComponent } from './carer-dashboard.component';

describe('CarerDashboardComponent', () => {
  let component: CarerDashboardComponent;
  let fixture: ComponentFixture<CarerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
