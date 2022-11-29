import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditLeadsComponent } from 'src/app/pages/crm/leads/edit-leads/edit-leads.component';

 

describe('EditLeadsComponent', () => {
  let component: EditLeadsComponent;
  let fixture: ComponentFixture<EditLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
