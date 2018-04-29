import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadIdentityComponent } from './upload-identity.component';

describe('UploadIdentityComponent', () => {
  let component: UploadIdentityComponent;
  let fixture: ComponentFixture<UploadIdentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadIdentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
