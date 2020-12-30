import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, AbstractControl } from '@angular/forms';

@Directive({
  // selector: 'button[fundoVermelho]'
  selector: '[classValidOrInvalid]'
})
export class ClassValidOrInvalidDirective {

  constructor(
  ) {
    console.log('constructor');
  }

  @HostBinding('class.is-valid') get valid() { return this.control.valid && this.isTouchedOrDirty() }
  @HostBinding('class.is-invalid') get invalid() { return this.control.invalid && this.isTouchedOrDirty() }

  @Input('classValidOrInvalid') control: AbstractControl

  isTouchedOrDirty(): boolean {
    return (this.control.touched || this.control.dirty);
  }

}
