import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarerMyProfileComponent } from './carer-my-profile.component';

describe('CarerMyProfileComponent', () => {
  let component: CarerMyProfileComponent;
  let fixture: ComponentFixture<CarerMyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarerMyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarerMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
