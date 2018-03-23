import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadingComponent } from './file-uploading.component';

describe('FileUploadingComponent', () => {
  let component: FileUploadingComponent;
  let fixture: ComponentFixture<FileUploadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
