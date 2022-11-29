import { TestBed } from '@angular/core/testing';

import { Lookuphead1Service } from './lookuphead1.service';

describe('Lookuphead1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Lookuphead1Service = TestBed.get(Lookuphead1Service);
    expect(service).toBeTruthy();
  });
});
