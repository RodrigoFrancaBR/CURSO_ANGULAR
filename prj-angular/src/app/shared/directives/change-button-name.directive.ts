import { Directive, HostBinding, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: 'button[changeButtonName]'
})
export class ChangeButtonNameDirective {
  
  constructor() { }

  @HostBinding('innerText') buttonName: string
  
  @Input('changeButtonName') path: string
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.path) {
      this.buttonName = this.path;
    }
  }

  ngOnInit() {
    this.buttonName = '';
  }
}
