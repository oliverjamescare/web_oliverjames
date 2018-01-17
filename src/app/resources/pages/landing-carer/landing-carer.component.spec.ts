import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCarerComponent } from './landing-carer.component';

describe('LandingCarerComponent', () => {
  let component: LandingCarerComponent;
  let fixture: ComponentFixture<LandingCarerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingCarerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingCarerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
