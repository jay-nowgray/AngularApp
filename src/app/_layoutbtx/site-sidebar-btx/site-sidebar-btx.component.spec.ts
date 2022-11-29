import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSidebarBtxComponent } from './site-sidebar-btx.component';

describe('SiteSidebarBtxComponent', () => {
  let component: SiteSidebarBtxComponent;
  let fixture: ComponentFixture<SiteSidebarBtxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSidebarBtxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSidebarBtxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
