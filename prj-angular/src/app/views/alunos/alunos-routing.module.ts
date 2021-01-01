import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlunosDetalheComponent } from './alunos-detalhe/alunos-detalhe.component';
import { AlunosListaComponent } from './alunos-lista/alunos-lista.component';
import { AlunosComponent } from './alunos.component';
import { CursoGuard } from './../../guards/curso.guard';

const alunosRoutes: Routes = [
  {
    path: '', component: AlunosComponent,
    children: [
      { path: '', component: AlunosListaComponent },
      { path: ':openType', component: AlunosDetalheComponent, canDeactivate: [CursoGuard] },
      { path: ':openType/:id', component: AlunosDetalheComponent },
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule],
})
export class AlunosRoutingModule { }
