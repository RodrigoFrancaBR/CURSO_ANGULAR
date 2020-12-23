import { ActivatedRoute } from '@angular/router';
import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  // selector: 'button[fundoVermelho]'
  selector: '[fundoVermelho]'
})
export class FundoVermelhoDirective {

  constructor(    
    // private elementRef: ElementRef,
    // private renderer: Renderer2
  ) {
    // não recomendado usar assim
    // elementRef.nativeElement.style.color = '#e35e6b';
    // this.elementRef.nativeElement.style.backgroundColor = 'red';

    // recomendado usar assim
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', '#e35e6b');            
  }

  @HostListener('mouseenter') onMouseEnter() {
    // this.styleColor = '#e35e6b';
    this.styleColor = this.highlightColor;
    // this.texto = 'Rodirgo';
  }

  @HostListener('mouseleave') onMouseLeave() {
    // this.styleColor = 'black';
    this.styleColor = this.defaultColor;
    // this.texto = 'Bruna';
  }

  @HostBinding('style.color') styleColor: string
  // @HostBinding('innerText') texto: string

  @Input() defaultColor: string = 'black';
  
  // @Input() highlightColor: string = 'red';
  @Input('fundoVermelho') highlightColor: string = 'red';

  ngOnInit() {
    this.styleColor = this.defaultColor;
  }

}
