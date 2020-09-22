import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { FormMensagemComponent } from 'src/app/components/form-mensagem/form-mensagem.component';
import { UnidadesRoutingModule } from './unidades-routing.module';
import { UnidadesComponent } from './unidades.component';
import { GridComponent } from './grid/grid.component';

import { UnidadesPrincipalComponent } from './unidades-principal/unidades-principal.component';
import { UnidadesFiltroComponent } from './unidades-filtro/unidades-filtro.component';
import { UnidadesListaComponent } from './unidades-lista/unidades-lista.component';
import { UnidadesEditarComponent } from './unidades-editar/unidades-editar.component';
import { UnidadesDetalheComponent } from './unidades-detalhe/unidades-detalhe.component';
import { UnidadesNaoEncontradoComponent } from './unidades-nao-encontrado/unidades-nao-encontrado.component';
import { UnidadesNovoComponent } from './unidades-novo/unidades-novo.component';


@NgModule({
  declarations: [
    UnidadesComponent,
    UnidadesPrincipalComponent,
    UnidadesNaoEncontradoComponent,
    UnidadesFiltroComponent,
    UnidadesListaComponent,
    UnidadesDetalheComponent,
    UnidadesEditarComponent,
    UnidadesNovoComponent,    
    GridComponent,
    FormMensagemComponent,
  ],
  imports: [
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    UnidadesRoutingModule
  ]
})
export class UnidadesModule { }
