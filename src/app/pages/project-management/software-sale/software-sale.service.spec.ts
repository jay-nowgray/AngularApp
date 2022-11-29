import { TestBed } from '@angular/core/testing';

import { SoftwareSaleService } from './software-sale.service';

describe('SoftwareSaleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoftwareSaleService = TestBed.get(SoftwareSaleService);
    expect(service).toBeTruthy();
  });
});
