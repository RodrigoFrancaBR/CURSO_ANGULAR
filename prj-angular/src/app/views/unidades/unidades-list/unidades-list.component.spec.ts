import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesListComponent } from './unidades-list.component';

describe('UnidadesListComponent', () => {
  let component: UnidadesListComponent;
  let fixture: ComponentFixture<UnidadesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
