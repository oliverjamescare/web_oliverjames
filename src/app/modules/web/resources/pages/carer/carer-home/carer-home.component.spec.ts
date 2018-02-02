import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarerHomeComponent } from './carer-home.component';

describe('CarerHomeComponent', () => {
  let component: CarerHomeComponent;
  let fixture: ComponentFixture<CarerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
