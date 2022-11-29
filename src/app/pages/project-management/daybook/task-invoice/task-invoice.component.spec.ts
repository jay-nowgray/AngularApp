import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInvoiceComponent } from './task-invoice.component';

describe('TaskInvoiceComponent', () => {
  let component: TaskInvoiceComponent;
  let fixture: ComponentFixture<TaskInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
