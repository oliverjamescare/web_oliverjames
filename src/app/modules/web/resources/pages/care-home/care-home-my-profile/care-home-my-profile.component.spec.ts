import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareHomeMyProfileComponent } from './care-home-my-profile.component';

describe('CareHomeMyProfileComponent', () => {
  let component: CareHomeMyProfileComponent;
  let fixture: ComponentFixture<CareHomeMyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareHomeMyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareHomeMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
