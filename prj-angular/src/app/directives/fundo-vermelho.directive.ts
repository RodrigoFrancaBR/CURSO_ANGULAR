import { ActivatedRoute } from '@angular/router';
import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  // selector: 'button[fundoVermelho]'
  selector: '[fundoVermelho]'
})
export class FundoVermelhoDirective {

  constructor(
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    // não recomendado usar assim
    // elementRef.nativeElement.style.color = '#e35e6b';
    // this.elementRef.nativeElement.style.backgroundColor = 'red';

    // recomendado usar assim
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', '#e35e6b');            
  }


  @HostListener('mouseenter') onMouseEnter() {
    this.styleColor = '#e35e6b';
  }

  @HostListener('mouseleave') onMouseLeave() {

    this.styleColor = 'black';
  }

  @HostBinding('style.color') styleColor: string
  // @HostBinding('innerText') styleColor: string

}
