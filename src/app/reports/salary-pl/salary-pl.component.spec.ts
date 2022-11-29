import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryPlComponent } from './salary-pl.component';

describe('SalaryPlComponent', () => {
  let component: SalaryPlComponent;
  let fixture: ComponentFixture<SalaryPlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryPlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryPlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
