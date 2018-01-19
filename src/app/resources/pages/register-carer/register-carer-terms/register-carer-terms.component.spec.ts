import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCarerTermsComponent } from './register-carer-terms.component';

describe('RegisterCarerTermsComponent', () => {
  let component: RegisterCarerTermsComponent;
  let fixture: ComponentFixture<RegisterCarerTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCarerTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCarerTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
