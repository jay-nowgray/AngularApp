import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLayoutBtxComponent } from './site-layout-btx.component';

describe('SiteLayoutComponent', () => {
  let component: SiteLayoutBtxComponent;
  let fixture: ComponentFixture<SiteLayoutBtxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteLayoutBtxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteLayoutBtxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
