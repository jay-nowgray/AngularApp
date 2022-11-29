import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTaskFormComponent } from './status-task-form.component';

describe('StatusTaskFormComponent', () => {
  let component: StatusTaskFormComponent;
  let fixture: ComponentFixture<StatusTaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusTaskFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
