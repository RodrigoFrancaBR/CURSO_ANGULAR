import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
};

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  providers: [INPUT_FIELD_VALUE_ACCESSOR,
  ]
})
export class InputFieldComponent implements ControlValueAccessor {

  @Input() id: string;
  @Input() label: string;
  @Input() type: string;
  @Input() isReadOnly = false;
  @Input() placeholder = '';
  @Input() control: AbstractControl;
  @Input() maxlength: string;

  public innerValue: string;

  get value() {
    return this.innerValue;
  }

  constructor() { }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  onChangeCb: (_: any) => void = () => {
  };

  onTouchedCb: (_: any) => void = () => {
  };

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

}
