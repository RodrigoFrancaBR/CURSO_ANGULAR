import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MymodalcomponentComponent } from './mymodalcomponent.component';

describe('MymodalcomponentComponent', () => {
  let component: MymodalcomponentComponent;
  let fixture: ComponentFixture<MymodalcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MymodalcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MymodalcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
