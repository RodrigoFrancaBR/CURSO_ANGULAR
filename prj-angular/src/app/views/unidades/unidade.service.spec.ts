import { TestBed } from '@angular/core/testing';

import { UnidadeService } from './unidade.service';

describe('UnidadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnidadeService = TestBed.get(UnidadeService);
    expect(service).toBeTruthy();
  });
});
