import { TestBed } from '@angular/core/testing';

import { SiteSidebarService } from './site-sidebar.service';

describe('SiteSidebarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiteSidebarService = TestBed.get(SiteSidebarService);
    expect(service).toBeTruthy();
  });
});
