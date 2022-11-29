import { TestBed } from '@angular/core/testing';

import { EmployeeinfoService } from './employeeinfo.service';

describe('EmployeeinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeinfoService = TestBed.get(EmployeeinfoService);
    expect(service).toBeTruthy();
  });
});
