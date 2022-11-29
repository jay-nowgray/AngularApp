import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePlComponent } from './employee-pl.component';

describe('EmployeePlComponent', () => {
  let component: EmployeePlComponent;
  let fixture: ComponentFixture<EmployeePlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
