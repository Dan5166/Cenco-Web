import { TestBed } from '@angular/core/testing';

import { MicrosoftApiService } from './microsoft-api.service';

describe('MicrosoftApiService', () => {
  let service: MicrosoftApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicrosoftApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
