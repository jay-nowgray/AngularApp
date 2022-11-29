import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupheadComponent } from './lookuphead.component';

describe('LookupheadComponent', () => {
  let component: LookupheadComponent;
  let fixture: ComponentFixture<LookupheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
