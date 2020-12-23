import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonSubmitDirective } from './directives/button-submit.directive';

@NgModule({
  declarations: [
    ButtonSubmitDirective]
  ,
  imports: [
    CommonModule
  ],
  exports: [ButtonSubmitDirective]
})
export class SharedModule { }
