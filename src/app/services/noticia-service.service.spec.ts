import { TestBed } from '@angular/core/testing';

import { NoticiaServiceService } from './noticia-service.service';

describe('NoticiaServiceService', () => {
  let service: NoticiaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticiaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
