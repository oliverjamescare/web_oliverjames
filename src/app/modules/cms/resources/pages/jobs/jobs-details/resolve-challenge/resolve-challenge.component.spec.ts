import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveChallengeComponent } from './resolve-challenge.component';

describe('ResolveChallengeComponent', () => {
  let component: ResolveChallengeComponent;
  let fixture: ComponentFixture<ResolveChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
