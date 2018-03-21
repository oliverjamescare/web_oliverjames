import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarerDetailsComponent } from './carer-details.component';

describe('CarerDetailsComponent', () => {
  let component: CarerDetailsComponent;
  let fixture: ComponentFixture<CarerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
