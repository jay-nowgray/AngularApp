import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingInvoiceUserComponent } from './pending-invoice-user.component';

describe('PendingInvoiceUserComponent', () => {
  let component: PendingInvoiceUserComponent;
  let fixture: ComponentFixture<PendingInvoiceUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingInvoiceUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingInvoiceUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
