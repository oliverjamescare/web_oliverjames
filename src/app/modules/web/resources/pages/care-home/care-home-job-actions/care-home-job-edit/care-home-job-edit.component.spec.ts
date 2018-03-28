import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareHomeJobEditComponent } from './care-home-job-edit.component';

describe('CareHomeJobEditComponent', () => {
  let component: CareHomeJobEditComponent;
  let fixture: ComponentFixture<CareHomeJobEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareHomeJobEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareHomeJobEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
