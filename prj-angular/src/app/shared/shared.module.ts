import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ButtonSubmitDirective } from './directives/button-submit.directive';
import { ExemplosPipesComponent } from './components/exemplos-pipes/exemplos-pipes.component';
import { CustoNumberPipe } from './pipe/custo-number.pipe';

registerLocaleData(localePt, 'pt');


@NgModule({
  declarations: [
    ExemplosPipesComponent,
    ButtonSubmitDirective,
    CustoNumberPipe]
  ,
  imports: [
    CommonModule
  ],
  exports: [
    ButtonSubmitDirective,
    ExemplosPipesComponent,
    CustoNumberPipe
  ],
  providers: [
    {
      provide: LOCALE_ID,
      // useValue: 'pt-BR'
      useValue: 'pt'
    },
  ]
})
export class SharedModule { }
