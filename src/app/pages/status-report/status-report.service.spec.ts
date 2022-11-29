import { TestBed } from '@angular/core/testing';

import { StatusReportService } from './status-report.service';

describe('StatusReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusReportService = TestBed.get(StatusReportService);
    expect(service).toBeTruthy();
  });
});
