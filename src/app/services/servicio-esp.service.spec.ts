import { TestBed } from '@angular/core/testing';

import { ServicioEspService } from './servicio-esp.service';

describe('ServicioEspService', () => {
  let service: ServicioEspService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioEspService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
