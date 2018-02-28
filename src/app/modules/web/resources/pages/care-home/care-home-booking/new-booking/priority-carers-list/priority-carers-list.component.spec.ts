import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityCarersListComponent } from './priority-carers-list.component';

describe('PriorityCarersListComponent', () => {
  let component: PriorityCarersListComponent;
  let fixture: ComponentFixture<PriorityCarersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityCarersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityCarersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
