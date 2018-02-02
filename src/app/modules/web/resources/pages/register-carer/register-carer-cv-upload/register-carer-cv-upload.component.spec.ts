import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCarerCvUploadComponent } from './register-carer-cv-upload.component';

describe('RegisterCarerCvUploadComponent', () => {
  let component: RegisterCarerCvUploadComponent;
  let fixture: ComponentFixture<RegisterCarerCvUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCarerCvUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCarerCvUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
