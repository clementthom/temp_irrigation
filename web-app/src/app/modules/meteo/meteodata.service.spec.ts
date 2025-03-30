import { TestBed } from '@angular/core/testing';

import { MeteodataService } from './meteodata.service';

describe('MeteodataService', () => {
  let service: MeteodataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeteodataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
