import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePlByDateComponent } from './employee-pl-by-date.component';

describe('EmployeePlByDateComponent', () => {
  let component: EmployeePlByDateComponent;
  let fixture: ComponentFixture<EmployeePlByDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePlByDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePlByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
