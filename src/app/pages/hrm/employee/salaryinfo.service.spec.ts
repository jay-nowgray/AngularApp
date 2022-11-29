import { TestBed } from '@angular/core/testing';

import { SalaryinfoService } from './salaryinfo.service';

describe('SalaryinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalaryinfoService = TestBed.get(SalaryinfoService);
    expect(service).toBeTruthy();
  });
});
