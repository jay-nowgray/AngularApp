import { TestBed } from '@angular/core/testing';

import { EmpoyeeexpenseserviceService } from './empoyeeexpenseservice.service';

describe('EmpoyeeexpenseserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpoyeeexpenseserviceService = TestBed.get(EmpoyeeexpenseserviceService);
    expect(service).toBeTruthy();
  });
});
