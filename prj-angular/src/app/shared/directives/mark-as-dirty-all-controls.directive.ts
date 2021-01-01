import { Directive, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: 'button[markAsDirtyAllControls]'
})
export class MarkAsDirtyAllControlsDirective {

  constructor() { }

  @Input('markAsDirtyAllControls') formulario: FormGroup
  //  passando o btn do html
  // @HostListener('click', ['$event.target']) onClick(target) {
  @HostListener('click') onClick() {

    // Object.keys(this.formulario.controls).forEach(c => {
    //   const control = this.formulario.get(c);
    //   control.markAllAsTouched();
    // });

    this.formulario.markAllAsTouched();

  }
}
