import { TestBed } from '@angular/core/testing';

import { InformesService } from './informes.service';

describe('InformesService', () => {
  let service: InformesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
