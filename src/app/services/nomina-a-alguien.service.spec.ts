import { TestBed } from '@angular/core/testing';

import { NominaAAlguienService } from './nomina-a-alguien.service';

describe('NominaAAlguienService', () => {
  let service: NominaAAlguienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominaAAlguienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
