import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdModalConfirmComponent } from './ngbd-modal-confirm.component';

describe('NgbdModalConfirmComponent', () => {
  let component: NgbdModalConfirmComponent;
  let fixture: ComponentFixture<NgbdModalConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbdModalConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdModalConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
