import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeJobComponent } from './challenge-job.component';

describe('ChallengeJobComponent', () => {
  let component: ChallengeJobComponent;
  let fixture: ComponentFixture<ChallengeJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
