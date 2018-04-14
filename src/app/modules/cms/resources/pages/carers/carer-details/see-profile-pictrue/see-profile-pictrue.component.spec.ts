import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeProfilePictrueComponent } from './see-profile-pictrue.component';

describe('SeeProfilePictrueComponent', () => {
  let component: SeeProfilePictrueComponent;
  let fixture: ComponentFixture<SeeProfilePictrueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeProfilePictrueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeProfilePictrueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
