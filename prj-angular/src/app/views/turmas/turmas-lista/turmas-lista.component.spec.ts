import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmasListaComponent } from './turmas-lista.component';

describe('TurmasListaComponent', () => {
  let component: TurmasListaComponent;
  let fixture: ComponentFixture<TurmasListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmasListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
