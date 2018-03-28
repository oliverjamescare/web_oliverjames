import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareHomeJobDetailsComponent } from './care-home-job-details.component';

describe('CareHomeJobDetailsComponent', () => {
  let component: CareHomeJobDetailsComponent;
  let fixture: ComponentFixture<CareHomeJobDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareHomeJobDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareHomeJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
