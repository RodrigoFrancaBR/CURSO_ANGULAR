import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ExemplosPipesComponent } from './components/exemplos-pipes/exemplos-pipes.component';
import { CustoNumberPipe } from './pipe/custo-number.pipe';
import { AddValidOrInvalidClassDirective } from './directives/add-valid-or-invalid-class.directive';
import { MarkAsDirtyAllControlsDirective } from './directives/mark-as-dirty-all-controls.directive';
import { ConsultaCepService } from './services/consulta-cep.service';
import { DropdownService } from './services/dropdown.service';
import { ControlErrorComponent } from './components/control-error/control-error.component';
import { ModalConfirmacaoComponent } from './modal/modal-confirmacao/modal-confirmacao.component';
import { EmailService } from './services/email.service';
import { EmailValidationsService } from './services/email-validations.service';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { FormsModule } from '@angular/forms';

registerLocaleData(localePt, 'pt');


@NgModule({
  declarations: [
    ExemplosPipesComponent,
    CustoNumberPipe,
    AddValidOrInvalidClassDirective,
    MarkAsDirtyAllControlsDirective,
    ControlErrorComponent,
    ModalConfirmacaoComponent,
    InputFieldComponent
  ]
  ,
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
  ],
  exports: [
    InputFieldComponent,
    ExemplosPipesComponent,
    CustoNumberPipe,
    AddValidOrInvalidClassDirective,
    MarkAsDirtyAllControlsDirective,
    ControlErrorComponent,
    ModalConfirmacaoComponent
  ],
  providers: [
    EmailValidationsService,
    EmailService,
    DropdownService,
    ConsultaCepService,
    {
      provide: LOCALE_ID,
      // useValue: 'pt-BR'
      useValue: 'pt'
    },
  ],
  entryComponents: [ModalConfirmacaoComponent],
})

export class SharedModule { }
