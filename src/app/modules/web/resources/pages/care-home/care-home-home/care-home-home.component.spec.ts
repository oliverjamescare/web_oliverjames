import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareHomeHomeComponent } from './care-home-home.component';

describe('CareHomeHomeComponent', () => {
  let component: CareHomeHomeComponent;
  let fixture: ComponentFixture<CareHomeHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareHomeHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareHomeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
