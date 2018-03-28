import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedCarersComponent } from './blocked-carers.component';

describe('BlockedCarersComponent', () => {
  let component: BlockedCarersComponent;
  let fixture: ComponentFixture<BlockedCarersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedCarersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedCarersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
