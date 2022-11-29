import { TestBed } from '@angular/core/testing';

import { MyfirmService } from './myfirm.service';

describe('MyfirmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyfirmService = TestBed.get(MyfirmService);
    expect(service).toBeTruthy();
  });
});
