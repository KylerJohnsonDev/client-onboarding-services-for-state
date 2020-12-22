import { TestBed } from '@angular/core/testing';

import { ClientStateService } from './client-state.service';

describe('ClientService', () => {
  let service: ClientStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
