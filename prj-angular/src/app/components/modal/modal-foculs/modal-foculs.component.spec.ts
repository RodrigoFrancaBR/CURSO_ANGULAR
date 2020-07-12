import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFoculsComponent } from './modal-foculs.component';

describe('ModalFoculsComponent', () => {
  let component: ModalFoculsComponent;
  let fixture: ComponentFixture<ModalFoculsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFoculsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFoculsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
