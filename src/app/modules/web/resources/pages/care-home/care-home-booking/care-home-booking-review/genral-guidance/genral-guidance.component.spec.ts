import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralGuidanceComponent } from './genral-guidance.component';

describe('GeneralGuidanceComponent', () => {
  let component: GeneralGuidanceComponent;
  let fixture: ComponentFixture<GeneralGuidanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralGuidanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralGuidanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
