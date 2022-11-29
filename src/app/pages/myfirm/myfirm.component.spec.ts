import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfirmComponent } from './myfirm.component';

describe('MyfirmComponent', () => {
  let component: MyfirmComponent;
  let fixture: ComponentFixture<MyfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
