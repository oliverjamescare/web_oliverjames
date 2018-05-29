import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIsOwesMoneyComponent } from './list-is-owes-money.component';

describe('ListIsOwesMoneyComponent', () => {
  let component: ListIsOwesMoneyComponent;
  let fixture: ComponentFixture<ListIsOwesMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListIsOwesMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIsOwesMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
