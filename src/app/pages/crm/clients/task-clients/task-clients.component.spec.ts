import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskClientsComponent } from './task-clients.component';

describe('TaskClientsComponent', () => {
  let component: TaskClientsComponent;
  let fixture: ComponentFixture<TaskClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
