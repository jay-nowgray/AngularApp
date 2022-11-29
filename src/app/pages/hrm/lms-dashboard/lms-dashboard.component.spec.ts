import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LMSDashboardComponent } from './lms-dashboard.component';

describe('LMSDashboardComponent', () => {
  let component: LMSDashboardComponent;
  let fixture: ComponentFixture<LMSDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LMSDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LMSDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
