import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteHeaderBtxComponent } from './site-header-btx.component';

describe('SiteHeaderComponent', () => {
  let component: SiteHeaderBtxComponent;
  let fixture: ComponentFixture<SiteHeaderBtxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteHeaderBtxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteHeaderBtxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
