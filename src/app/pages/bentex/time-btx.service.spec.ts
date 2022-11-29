import { TestBed } from '@angular/core/testing';

import { TimeBtxService } from './time-btx.service';

describe('TimeBtxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeBtxService = TestBed.get(TimeBtxService);
    expect(service).toBeTruthy();
  });
});
