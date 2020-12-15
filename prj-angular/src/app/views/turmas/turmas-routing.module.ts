import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TurmasListaComponent } from './turmas-lista/turmas-lista.component';
import { TurmasDetalheComponent } from './turmas-detalhe/turmas-detalhe.component';
import { TurmasComponent } from './turmas.component';


const turmasRoutes: Routes = [
  // { path: 'turmas', component: TurmasComponent },
  // { path: 'turmas/novo', component: TurmasNovoComponent },
  // { path: 'turmas/:id', component: TurmasDetalheComponent },
  // { path: 'turmas/:id/detalhe', component: TurmasDetalheComponent },
  {
    path: 'turmas', component: TurmasComponent, children: [
      { path: '', component: TurmasListaComponent },
      // { path: 'novo', component: TurmasNovoComponent },
      { path: 'novo', component: TurmasDetalheComponent },
      { path: ':id', component: TurmasListaComponent },
      { path: ':id/detalhe', component: TurmasDetalheComponent },
    ]
  },


];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(turmasRoutes)],
  exports: [RouterModule]
})
export class TurmasRoutingModule { }
