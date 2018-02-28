import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceTabComponent } from './preference-tab.component';

describe('PreferenceTabComponent', () => {
  let component: PreferenceTabComponent;
  let fixture: ComponentFixture<PreferenceTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenceTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
