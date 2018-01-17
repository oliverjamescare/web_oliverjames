import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingStaticTopComponent } from './landing-static-top.component';

describe('LandingStaticTopComponent', () => {
  let component: LandingStaticTopComponent;
  let fixture: ComponentFixture<LandingStaticTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingStaticTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingStaticTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
