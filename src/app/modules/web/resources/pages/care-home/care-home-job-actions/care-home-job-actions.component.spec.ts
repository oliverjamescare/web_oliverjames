import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareHomeJobActionsComponent } from './care-home-job-actions.component';

describe('CareHomeJobActionsComponent', () => {
  let component: CareHomeJobActionsComponent;
  let fixture: ComponentFixture<CareHomeJobActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareHomeJobActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareHomeJobActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
