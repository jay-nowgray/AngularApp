import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeUserTrackerComponent } from './time-user-tracker.component';

describe('TimeUserTrackerComponent', () => {
  let component: TimeUserTrackerComponent;
  let fixture: ComponentFixture<TimeUserTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeUserTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeUserTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
