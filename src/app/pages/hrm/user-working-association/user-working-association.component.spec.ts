import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkingAssociationComponent } from './user-working-association.component';

describe('UserWorkingAssociationComponent', () => {
  let component: UserWorkingAssociationComponent;
  let fixture: ComponentFixture<UserWorkingAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWorkingAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWorkingAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
