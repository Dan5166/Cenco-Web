import { TestBed } from '@angular/core/testing';

import { ContactoRapidoService } from './contacto-rapido.service';

describe('ContactoRapidoService', () => {
  let service: ContactoRapidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactoRapidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
