import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtxInvoiceComponent } from './btx-invoice.component';

describe('BtxInvoiceComponent', () => {
  let component: BtxInvoiceComponent;
  let fixture: ComponentFixture<BtxInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtxInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtxInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
