import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeaheadFocusComponent } from './typeahead-focus.component';

describe('TypeaheadFocusComponent', () => {
  let component: TypeaheadFocusComponent;
  let fixture: ComponentFixture<TypeaheadFocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeaheadFocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeaheadFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
