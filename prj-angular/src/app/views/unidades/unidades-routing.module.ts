import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UnidadesComponent } from './unidades.component';
import { UnidadesNaoEncontradoComponent } from './unidades-nao-encontrado/unidades-nao-encontrado.component';
import { UnidadesNovoComponent } from './unidades-novo/unidades-novo.component';
import { UnidadesDetalheComponent } from './unidades-detalhe/unidades-detalhe.component';
import { UnidadesEditarComponent } from './unidades-editar/unidades-editar.component';

// const unidadesRoutes: Routes = [
//     { path: 'unidades', component: UnidadesComponent },
//     { path: 'naoEncontrado', component: UnidadesNaoEncontradoComponent },
//     { path: 'unidades/novo', component: UnidadesNovoComponent },
//     { path: 'unidades/:id', component: UnidadesComponent },
//     { path: 'unidades/:id/detalhe', component: UnidadesDetalheComponent },
//     { path: 'unidades/:id/editar', component: UnidadesEditarComponent },
// ];


const unidadesRoutes: Routes = [
    { path: '', component: UnidadesComponent },
    { path: 'naoEncontrado', component: UnidadesNaoEncontradoComponent },
    { path: 'novo', component: UnidadesNovoComponent },
    { path: ':id', component: UnidadesComponent },
    { path: ':id/detalhe', component: UnidadesDetalheComponent },
    { path: ':id/editar', component: UnidadesEditarComponent },
];

@NgModule({
    // por ser um módulo de funcionalidade usamos o forChild 
    imports: [RouterModule.forChild(unidadesRoutes)],
    exports: [RouterModule]
})
export class UnidadesRoutingModule { }
