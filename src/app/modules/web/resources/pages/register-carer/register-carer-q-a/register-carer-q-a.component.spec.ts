import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCarerQAComponent } from './register-carer-q-a.component';

describe('RegisterCarerQAComponent', () => {
  let component: RegisterCarerQAComponent;
  let fixture: ComponentFixture<RegisterCarerQAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCarerQAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCarerQAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
