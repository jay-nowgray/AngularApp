import { TestBed } from '@angular/core/testing';

import { EmployeeContactService } from './employee-contact.service';

describe('EmployeeContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeContactService = TestBed.get(EmployeeContactService);
    expect(service).toBeTruthy();
  });
});
