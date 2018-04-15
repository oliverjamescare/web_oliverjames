import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCareHomeComponent } from './add-care-home.component';

describe('AddCareHomeComponent', () => {
  let component: AddCareHomeComponent;
  let fixture: ComponentFixture<AddCareHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCareHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCareHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
