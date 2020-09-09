import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesFilterComponent } from './unidades-filter.component';

describe('UnidadesFilterComponent', () => {
  let component: UnidadesFilterComponent;
  let fixture: ComponentFixture<UnidadesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
