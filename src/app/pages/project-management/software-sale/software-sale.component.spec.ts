import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareSaleComponent } from './software-sale.component';

describe('SoftwareSaleComponent', () => {
  let component: SoftwareSaleComponent;
  let fixture: ComponentFixture<SoftwareSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftwareSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
