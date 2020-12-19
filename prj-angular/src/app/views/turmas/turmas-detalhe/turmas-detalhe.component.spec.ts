import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmasDetalheComponent } from './turmas-detalhe.component';

describe('TurmasDetalheComponent', () => {
  let component: TurmasDetalheComponent;
  let fixture: ComponentFixture<TurmasDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmasDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmasDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
