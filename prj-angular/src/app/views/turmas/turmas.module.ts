import { TurmasService } from './turmas.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { TurmasRoutingModule } from './turmas-routing.module';
import { TurmasComponent } from './turmas.component';
import { TurmasDetalheComponent } from './turmas-detalhe/turmas-detalhe.component';
import { TurmasListaComponent } from './turmas-lista/turmas-lista.component';
import { UnidadesService } from '../unidades/unidades.service';
import { TurmaGuard } from './guard/turma.guard';
import { TurmaDetalheResolver } from './guard/turma-detalhe.resolver';


@NgModule({
  declarations: [
    TurmasComponent,
    TurmasDetalheComponent,
    TurmasListaComponent],
  imports: [
    CommonModule,
    TurmasRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    // UnidadesModule    
  ], providers: [
    TurmaGuard,
    TurmaDetalheResolver,
    TurmasService,
    UnidadesService
  ]
})
export class TurmasModule { }
