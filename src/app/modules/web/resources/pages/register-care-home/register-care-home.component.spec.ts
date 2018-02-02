import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCareHomeComponent } from './register-care-home.component';

describe('RegisterCareHomeComponent', () => {
  let component: RegisterCareHomeComponent;
  let fixture: ComponentFixture<RegisterCareHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCareHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCareHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
