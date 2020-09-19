import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesNovoComponent } from './unidades-novo.component';

describe('UnidadesNovoComponent', () => {
  let component: UnidadesNovoComponent;
  let fixture: ComponentFixture<UnidadesNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
