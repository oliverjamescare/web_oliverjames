import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminAccountComponent } from './create-admin-account.component';

describe('CreateAdminAccountComponent', () => {
  let component: CreateAdminAccountComponent;
  let fixture: ComponentFixture<CreateAdminAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdminAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdminAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
