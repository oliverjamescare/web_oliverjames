import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAdminsComponent } from './list-of-admins.component';

describe('ListOfAdminsComponent', () => {
  let component: ListOfAdminsComponent;
  let fixture: ComponentFixture<ListOfAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
