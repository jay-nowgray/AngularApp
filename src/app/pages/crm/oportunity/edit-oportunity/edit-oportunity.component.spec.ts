import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOportunityComponent } from './edit-oportunity.component';

describe('EditOportunityComponent', () => {
  let component: EditOportunityComponent;
  let fixture: ComponentFixture<EditOportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOportunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
