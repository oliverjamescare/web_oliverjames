import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareHomeCarerDetailsComponent } from './care-home-carer-details.component';

describe('CareHomeCarerDetailsComponent', () => {
  let component: CareHomeCarerDetailsComponent;
  let fixture: ComponentFixture<CareHomeCarerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareHomeCarerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareHomeCarerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
