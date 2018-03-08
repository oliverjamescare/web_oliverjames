import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarerJobListComponent } from './carer-job-list.component';

describe('CarerJobListComponent', () => {
  let component: CarerJobListComponent;
  let fixture: ComponentFixture<CarerJobListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarerJobListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarerJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
