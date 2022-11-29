import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryAdjustmentComponent } from './salary-adjustment.component';

describe('SalaryAdjustmentComponent', () => {
  let component: SalaryAdjustmentComponent;
  let fixture: ComponentFixture<SalaryAdjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryAdjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
