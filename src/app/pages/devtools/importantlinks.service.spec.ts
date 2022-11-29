import { TestBed } from '@angular/core/testing';

import { ImportantlinksService } from './importantlinks.service';

describe('ImportantlinksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImportantlinksService = TestBed.get(ImportantlinksService);
    expect(service).toBeTruthy();
  });
});
