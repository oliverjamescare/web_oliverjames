import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareHomeDashboardComponent } from './care-home-dashboard.component';

describe('CareHomeDashboardComponent', () => {
  let component: CareHomeDashboardComponent;
  let fixture: ComponentFixture<CareHomeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareHomeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareHomeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
