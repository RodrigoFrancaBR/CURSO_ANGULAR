import { Directive, HostBinding, Input, } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[addValidOrInvalidClass]'
})
export class AddValidOrInvalidClassDirective {

  constructor() {}

  @HostBinding('class.is-valid') get valid() { return this.control.valid && this.isTouchedOrDirty() }
  @HostBinding('class.is-invalid') get invalid() { return this.control.invalid && this.isTouchedOrDirty() }

  @Input('addValidOrInvalidClass') control: AbstractControl

  isTouchedOrDirty(): boolean {
    return (this.control.touched || this.control.dirty);
  }

}
