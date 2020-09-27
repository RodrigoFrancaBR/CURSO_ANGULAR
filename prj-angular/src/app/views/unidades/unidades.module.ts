import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppMaterialModule } from 'src/app/app-material/app-material.module';

import { UnidadesRoutingModule } from './unidades-routing.module';
import { UnidadesComponent } from './unidades.component';
import { UnidadesFiltroComponent } from './unidades-filtro/unidades-filtro.component';
import { UnidadesListaComponent } from './unidades-lista/unidades-lista.component';
import { UnidadesEditarComponent } from './unidades-editar/unidades-editar.component';
import { UnidadesDetalheComponent } from './unidades-detalhe/unidades-detalhe.component';
import { UnidadesNaoEncontradoComponent } from './unidades-nao-encontrado/unidades-nao-encontrado.component';
import { UnidadesNovoComponent } from './unidades-novo/unidades-novo.component';
import { UnidadesService } from './unidades.service';


@NgModule({
  declarations: [
    UnidadesComponent,
    UnidadesNaoEncontradoComponent,
    UnidadesFiltroComponent,
    UnidadesListaComponent,
    UnidadesDetalheComponent,
    UnidadesEditarComponent,
    UnidadesNovoComponent,
  ],
  imports: [
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    UnidadesRoutingModule
  ],
  providers:[UnidadesService]
})
export class UnidadesModule { }
