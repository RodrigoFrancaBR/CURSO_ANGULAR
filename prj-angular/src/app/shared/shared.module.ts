import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ExemplosPipesComponent } from './components/exemplos-pipes/exemplos-pipes.component';
import { CustoNumberPipe } from './pipe/custo-number.pipe';
import { AddValidOrInvalidClassDirective } from './directives/add-valid-or-invalid-class.directive';
import { MarkAsDirtyAllControlsDirective } from './directives/mark-as-dirty-all-controls.directive';
import { ConsultaCepService } from './services/consulta-cep.service';
import { DropdownService } from './services/dropdown.service';


registerLocaleData(localePt, 'pt');


@NgModule({
  declarations: [
    ExemplosPipesComponent,
    CustoNumberPipe,
    AddValidOrInvalidClassDirective,
    MarkAsDirtyAllControlsDirective,
  ]
  ,
  imports: [
    CommonModule
  ],
  exports: [
    ExemplosPipesComponent,
    CustoNumberPipe,
    AddValidOrInvalidClassDirective,
    MarkAsDirtyAllControlsDirective
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
