import { TestBed } from '@angular/core/testing';

import { OportunityService } from './oportunity.service';

describe('OportunityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OportunityService = TestBed.get(OportunityService);
    expect(service).toBeTruthy();
  });
});
