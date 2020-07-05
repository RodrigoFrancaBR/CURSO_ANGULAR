import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[myFor]'
})
export class ForDirective implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('myForNumeros') numeros: number[];
  // tslint:disable-next-line: no-input-rename
  @Input('myForUsando') texto: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  ngOnInit() {
    for (let numero of this.numeros) {
      this.viewContainer.createEmbeddedView(this.templateRef,
         { $implicit: numero });
    }
  }
}
