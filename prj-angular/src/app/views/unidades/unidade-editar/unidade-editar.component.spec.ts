import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeEditarComponent } from './unidade-editar.component';

describe('UnidadeEditarComponent', () => {
  let component: UnidadeEditarComponent;
  let fixture: ComponentFixture<UnidadeEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadeEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
