import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsPopupComponent } from './cms-popup.component';

describe('CmsPopupComponent', () => {
  let component: CmsPopupComponent;
  let fixture: ComponentFixture<CmsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
