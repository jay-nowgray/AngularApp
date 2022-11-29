import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPermisionComponent } from './menu-permision.component';

describe('MenuPermisionComponent', () => {
  let component: MenuPermisionComponent;
  let fixture: ComponentFixture<MenuPermisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPermisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPermisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
