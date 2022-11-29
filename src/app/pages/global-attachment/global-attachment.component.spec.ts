import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalAttachmentComponent } from './global-attachment.component';

describe('GlobalAttachmentComponent', () => {
  let component: GlobalAttachmentComponent;
  let fixture: ComponentFixture<GlobalAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
