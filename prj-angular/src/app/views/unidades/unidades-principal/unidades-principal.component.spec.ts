import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesPrincipalComponent } from './unidades-principal.component';

describe('UnidadesPrincipalComponent', () => {
  let component: UnidadesPrincipalComponent;
  let fixture: ComponentFixture<UnidadesPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadesPrincipalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
