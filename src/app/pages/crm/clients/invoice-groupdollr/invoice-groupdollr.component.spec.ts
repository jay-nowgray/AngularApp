import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceGroupdollrComponent } from './invoice-groupdollr.component';

describe('InvoiceGroupdollrComponent', () => {
  let component: InvoiceGroupdollrComponent;
  let fixture: ComponentFixture<InvoiceGroupdollrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceGroupdollrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceGroupdollrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
