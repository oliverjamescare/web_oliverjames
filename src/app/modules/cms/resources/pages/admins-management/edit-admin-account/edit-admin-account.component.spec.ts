import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminAccountComponent } from './edit-admin-account.component';

describe('EditAdminAccountComponent', () => {
  let component: EditAdminAccountComponent;
  let fixture: ComponentFixture<EditAdminAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdminAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
