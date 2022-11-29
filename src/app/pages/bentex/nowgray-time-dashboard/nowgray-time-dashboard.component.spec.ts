import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NowgrayTimeDashboardComponent } from './nowgray-time-dashboard.component';

describe('NowgrayTimeDashboardComponent', () => {
  let component: NowgrayTimeDashboardComponent;
  let fixture: ComponentFixture<NowgrayTimeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NowgrayTimeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowgrayTimeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
