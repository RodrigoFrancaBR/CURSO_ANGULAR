import { CadastroComponent } from './views/unidades/cadastro/cadastro.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { UnidadesComponent } from './views/unidades/unidades.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'unidades', component: UnidadesComponent
  },
  {
    path: 'unidades/cadastro', component: CadastroComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
