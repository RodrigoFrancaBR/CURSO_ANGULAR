import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UnidadesComponent } from './unidades.component';

const unidadesRoutes: Routes = [
    { path: 'unidades', component: UnidadesComponent },
    // { path: 'naoEncontrado', component: CursoNaoEncontradoComponent },
    // { path: ':id', component: CursoDetalheComponent }
];

@NgModule({
    imports: [RouterModule.forChild(unidadesRoutes)],
    exports: [RouterModule]
})
export class UnidadesRoutingModule { }
