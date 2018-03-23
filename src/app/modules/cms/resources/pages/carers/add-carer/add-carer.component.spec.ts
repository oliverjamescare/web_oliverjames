import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarerComponent } from './add-carer.component';

describe('AddCarerComponent', () => {
  let component: AddCarerComponent;
  let fixture: ComponentFixture<AddCarerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
