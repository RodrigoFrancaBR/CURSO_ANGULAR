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
import { ModalConfirmationComponent } from 'src/app/util/modal-confirmation';
import { ModalInclusionComponent } from 'src/app/util/modal-inclusion';

import { FiltroComponent } from './filtro/filtro.component';
import { UnidadesRoutingModule } from './unidades-routing.module';
import { UnidadesComponent } from './unidades.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { GridComponent } from './grid/grid.component';
import { UnidadeEditarComponent } from './unidade-editar/unidade-editar.component';
import { UnidadesFilterComponent } from './unidades-filter/unidades-filter.component';

@NgModule({
  declarations: [
    FiltroComponent,
    UnidadesComponent,
    CadastroComponent,
    GridComponent,
    UnidadeEditarComponent,
    FormMensagemComponent,
    ModalConfirmationComponent,
    ModalInclusionComponent,
    UnidadesFilterComponent
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
