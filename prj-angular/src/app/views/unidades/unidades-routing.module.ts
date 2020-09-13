import { UnidadesNaoEncontradoComponent } from './unidades-nao-encontrado/unidades-nao-encontrado.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UnidadesComponent } from './unidades.component';
import { UnidadesDetalheComponent } from './unidades-detalhe/unidades-detalhe.component';

const unidadesRoutes: Routes = [
    { path: 'unidades', component: UnidadesComponent },
    { path: 'unidades/:id', component: UnidadesDetalheComponent },
    { path: 'naoEncontrado', component: UnidadesNaoEncontradoComponent },
    // { path: ':id', component: CursoDetalheComponent }
];

@NgModule({
    imports: [RouterModule.forChild(unidadesRoutes)],
    exports: [RouterModule]
})
export class UnidadesRoutingModule { }
