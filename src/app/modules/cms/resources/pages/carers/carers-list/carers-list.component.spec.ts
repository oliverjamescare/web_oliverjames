import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarersListComponent } from './carers-list.component';

describe('CarersListComponent', () => {
  let component: CarersListComponent;
  let fixture: ComponentFixture<CarersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
