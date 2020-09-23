import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './views/home/home.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'unidades', loadChildren: 'src/app/views/unidades/unidades.module#UnidadesModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
