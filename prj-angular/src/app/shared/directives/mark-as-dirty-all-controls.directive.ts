import { Directive, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: 'button[markAsDirtyAllControls]'
})
export class MarkAsDirtyAllControlsDirective {

  constructor() { }

  @Input('markAsDirtyAllControls') formulario: FormGroup

  // @HostListener('click', ['$event.target']) onClick(target) {
  @HostListener('click') onClick() {

    if (this.formulario.invalid) {

      Object.keys(this.formulario.controls).forEach(c => {

        const control = this.formulario.get(c);

        if (control.errors) {
          console.log(`${control.errors}`);
          control.markAsDirty();
        }
      });
    }
  }
}
