import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  // selector: 'button[fundoVermelho]'
  selector: 'button[buttonSubmit]'
})
export class ButtonSubmitDirective {

  inscricao: Subscription;
  path: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    // private elementRef: ElementRef,
    // private renderer: Renderer2
  ) {

    // não recomendado usar assim
    // elementRef.nativeElement.style.color = '#e35e6b';
    // this.elementRef.nativeElement.style.backgroundColor = 'red';

    // console.log(this.elementRef.nativeElement);

    // recomendado usar assim
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', '#e35e6b');            

    let url: Array<UrlSegment> = this.activatedRoute.snapshot.url;

    // pegando o path novo
    this.path = url[0].path

    // pegando o path detalhe 
    if (url[1] && url[1].path) {
      this.path = url[1].path;
    }

    switch (this.path) {
      case 'novo':
        this.buttonSubmit = 'Salvar'
        break;

      case 'detalhe':
        this.buttonSubmit = 'Atualizar'
        break;
    }
  }

  @HostBinding('innerText') buttonSubmit: string
  @HostBinding('class') class: string = 'btn btn-sm btn-success';
  @HostListener('blur') onBlur() {
    console.log('blur');
  }
}
