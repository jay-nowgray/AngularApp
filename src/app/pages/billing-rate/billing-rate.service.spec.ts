import { TestBed } from '@angular/core/testing';

import { BillingRateService } from './billing-rate.service';

describe('BillingRateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillingRateService = TestBed.get(BillingRateService);
    expect(service).toBeTruthy();
  });
});
