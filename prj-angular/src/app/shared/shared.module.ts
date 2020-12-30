import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ButtonSubmitDirective } from './directives/button-submit.directive';
import { ExemplosPipesComponent } from './components/exemplos-pipes/exemplos-pipes.component';
import { CustoNumberPipe } from './pipe/custo-number.pipe';
import { ConsultaCepService } from './services/consulta-cep.service';
import { DropdownService } from './services/dropdown.service';
import { ClassValidOrInvalidDirective } from './directives/aplicar-css.directive';

registerLocaleData(localePt, 'pt');


@NgModule({
  declarations: [
    ExemplosPipesComponent,
    ButtonSubmitDirective,
    CustoNumberPipe,
    ClassValidOrInvalidDirective
  ]
  ,
  imports: [
    CommonModule
  ],
  exports: [
    ButtonSubmitDirective,
    ExemplosPipesComponent,
    CustoNumberPipe,
    ClassValidOrInvalidDirective
  ],
  providers: [
    DropdownService,
    ConsultaCepService,
    {
      provide: LOCALE_ID,
      // useValue: 'pt-BR'
      useValue: 'pt'
    },
  ]
})

export class SharedModule { }
