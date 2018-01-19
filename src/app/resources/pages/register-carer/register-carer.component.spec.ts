import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCarerComponent } from './register-carer.component';

describe('RegisterCarerComponent', () => {
  let component: RegisterCarerComponent;
  let fixture: ComponentFixture<RegisterCarerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCarerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCarerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
