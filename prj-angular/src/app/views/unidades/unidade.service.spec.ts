import { TestBed } from '@angular/core/testing';

import { UnidadesService } from './unidades.service';

describe('UnidadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnidadesService = TestBed.get(UnidadesService);
    expect(service).toBeTruthy();
  });
});
