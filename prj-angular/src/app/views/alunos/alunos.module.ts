import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosService } from './alunos.service';
import { AlunosDetalheComponent } from './alunos-detalhe/alunos-detalhe.component';
import { AlunosComponent } from './alunos.component';
import { AlunosListaComponent } from './alunos-lista/alunos-lista.component';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { AlunoDeactivateGuard } from './guard/aluno-deactivate.guard';


@NgModule({
  declarations: [
    AlunosComponent,
    AlunosDetalheComponent,
    AlunosListaComponent,    
  ],
  imports: [
    CommonModule,
    AlunosRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule,    
  ],
  providers: [
    AlunosService,
    AlunoDeactivateGuard
  ]
})
export class AlunosModule { }
