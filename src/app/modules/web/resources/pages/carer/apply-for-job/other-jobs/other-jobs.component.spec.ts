import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherJobsComponent } from './other-jobs.component';

describe('OtherJobsComponent', () => {
  let component: OtherJobsComponent;
  let fixture: ComponentFixture<OtherJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
