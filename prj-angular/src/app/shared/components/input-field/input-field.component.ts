import { distinctUntilChanged, tap } from 'rxjs/operators';
import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
};

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',

  providers: [INPUT_FIELD_VALUE_ACCESSOR,
    //  {provide: NG_VALIDATORS, useExisting: forwardRef(() => InputFieldComponent), multi: true}
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

  public innerValue: any;

  get value() {
    return this.innerValue;
  }

  constructor() { }

  ngOnInit() {
    // this.control.valueChanges
    //   .pipe(
    //     distinctUntilChanged(),
    //     tap(v => console.log(v))
    //   )
    //   .subscribe(v => this.onChangeCb(v)
    //   );
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      console.log(this.control.touched);
      // this.control.valueChanges
      //   .pipe(
      //     distinctUntilChanged(),
      //     // tap(v => console.log(v))
      //   )
      //   .subscribe(v => console.log(v));

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

  ngDoCheck() {
    console.log(this.control.touched);
  }

}
