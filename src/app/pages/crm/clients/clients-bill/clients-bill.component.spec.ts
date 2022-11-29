import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsBillComponent } from './clients-bill.component';

describe('ClientsBillComponent', () => {
  let component: ClientsBillComponent;
  let fixture: ComponentFixture<ClientsBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
