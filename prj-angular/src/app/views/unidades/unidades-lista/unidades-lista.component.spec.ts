import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesListaComponent } from './unidades-lista.component';

describe('UnidadesListaComponent', () => {
  let component: UnidadesListaComponent;
  let fixture: ComponentFixture<UnidadesListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
