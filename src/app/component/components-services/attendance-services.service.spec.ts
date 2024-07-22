import { TestBed } from '@angular/core/testing';

import { AttendanceServicesService } from './attendance-services.service';

describe('AttendanceServicesService', () => {
  let service: AttendanceServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
