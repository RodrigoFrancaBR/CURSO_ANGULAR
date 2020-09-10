import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesFiltroComponent } from './unidades-filtro.component';

describe('UnidadesFiltroComponent', () => {
  let component: UnidadesFiltroComponent;
  let fixture: ComponentFixture<UnidadesFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
