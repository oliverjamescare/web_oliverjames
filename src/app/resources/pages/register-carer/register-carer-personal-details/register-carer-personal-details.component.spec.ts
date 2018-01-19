import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCarerPersonalDetailsComponent } from './register-carer-personal-details.component';

describe('RegisterCarerPersonalDetailsComponent', () => {
  let component: RegisterCarerPersonalDetailsComponent;
  let fixture: ComponentFixture<RegisterCarerPersonalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCarerPersonalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCarerPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
