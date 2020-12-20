import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlunosDetalheComponent } from './alunos-detalhe/alunos-detalhe.component';
import { AlunosListaComponent } from './alunos-lista/alunos-lista.component';
import { AlunosComponent } from './alunos.component';
import { AlunoDeactivateGuard } from './guard/aluno-deactivate.guard';


const alunosRoutes: Routes = [
  {
    path: '', component: AlunosComponent,
    canActivateChild: [],
    children: [
      { path: '', component: AlunosListaComponent },
      { path: 'novo', component: AlunosDetalheComponent, canDeactivate: [AlunoDeactivateGuard] },
      { path: ':id', component: AlunosListaComponent },
      { path: ':id/detalhe', component: AlunosDetalheComponent },
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule],
})
export class AlunosRoutingModule { }
