import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyAdminAccountComponent } from './edit-my-admin-account.component';

describe('EditMyAdminAccountComponent', () => {
  let component: EditMyAdminAccountComponent;
  let fixture: ComponentFixture<EditMyAdminAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMyAdminAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMyAdminAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
