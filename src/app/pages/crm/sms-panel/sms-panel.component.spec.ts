import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsPanelComponent } from './sms-panel.component';

describe('SmsPanelComponent', () => {
  let component: SmsPanelComponent;
  let fixture: ComponentFixture<SmsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
