import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TurmaDetalheResolver } from './guard/turma-detalhe.resolver';
import { TurmasListaComponent } from './turmas-lista/turmas-lista.component';
import { TurmasDetalheComponent } from './turmas-detalhe/turmas-detalhe.component';
import { TurmasComponent } from './turmas.component';
import { TurmaGuard } from 'src/app/views/turmas/guard/turma.guard';

const turmasRoutes: Routes = [
  {
    path: '', component: TurmasComponent,
    canActivateChild: [TurmaGuard],

    children: [

      { path: '', component: TurmasListaComponent },

      // { path: 'lista', component: TurmasListaComponent },

      { path: 'novo', component: TurmasDetalheComponent },

      { path: ':id', component: TurmasListaComponent },

      {
        path: ':id/detalhe', component: TurmasDetalheComponent,
        resolve: { listaDeUnidades: TurmaDetalheResolver }
      },

    ]

  },

  // {
  //   path: 'turmas', component: TurmasComponent, children: [
  //     { path: '', component: TurmasListaComponent },      
  //     { path: 'novo', component: TurmasDetalheComponent },
  //     { path: ':id', component: TurmasListaComponent },
  //     { path: ':id/detalhe', component: TurmasDetalheComponent },
  //   ]
  // },

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(turmasRoutes)],
  exports: [RouterModule],
  providers: []
})
export class TurmasRoutingModule { }
