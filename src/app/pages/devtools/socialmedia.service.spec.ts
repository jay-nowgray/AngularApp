import { TestBed } from '@angular/core/testing';

import { SocialmediaService } from './socialmedia.service';

describe('SocialmediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocialmediaService = TestBed.get(SocialmediaService);
    expect(service).toBeTruthy();
  });
});
