import { UnidadeEditarComponent } from './views/unidades/unidade-editar/unidade-editar.component';
import { ExemploComponent } from './views/exemplo/exemplo.component';
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
    path: 'exemplos', component: ExemploComponent
  },

  {
    path: 'unidades', component: UnidadesComponent
  },

  {
    path: 'unidades/cadastro', component: CadastroComponent
  },

  {
    path: 'unidades/editar/:id', component: UnidadeEditarComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
