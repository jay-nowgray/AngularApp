import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDaybookComponent } from './multi-daybook.component';

describe('MultiDaybookComponent', () => {
  let component: MultiDaybookComponent;
  let fixture: ComponentFixture<MultiDaybookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiDaybookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiDaybookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
