import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtxInvoiceComboComponent } from './btx-invoice-combo.component';

describe('BtxInvoiceComboComponent', () => {
  let component: BtxInvoiceComboComponent;
  let fixture: ComponentFixture<BtxInvoiceComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtxInvoiceComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtxInvoiceComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
