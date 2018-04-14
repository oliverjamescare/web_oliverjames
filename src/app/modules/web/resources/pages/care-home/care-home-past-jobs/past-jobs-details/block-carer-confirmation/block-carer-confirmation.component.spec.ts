import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCarerConfirmationComponent } from './block-carer-confirmation.component';

describe('BlockCarerConfirmationComponent', () => {
  let component: BlockCarerConfirmationComponent;
  let fixture: ComponentFixture<BlockCarerConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockCarerConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCarerConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
