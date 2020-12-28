import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { CursoGuard } from './guards/curso.guard';
import { PaginaNaoEncontradaComponent } from './views/pagina-nao-encontrada/pagina-nao-encontrada.component';


const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },

    // rota de funcionalidade
    {
        path: 'unidades',
        loadChildren: 'src/app/views/unidades/unidades.module#UnidadesModule',
        // canActivate: [AuthGuard]
        canActivate: [CursoGuard],
        canLoad: [CursoGuard]
    },

    {
        path: 'turmas',
        loadChildren: 'src/app/views/turmas/turmas.module#TurmasModule',
        // canActivate: [AuthGuard],
        canActivate: [CursoGuard],
        // canActivateChild:[TurmaGuard]
        canLoad: [CursoGuard]
    },

    {
        path: 'alunos',
        loadChildren: 'src/app/views/alunos/alunos.module#AlunosModule',
        // canActivate: [AuthGuard],
        canActivate: [CursoGuard],
        canLoad: [CursoGuard]
    },

    // {
    //     path: '',
    //     component: HomeComponent,
    //     // canActivate: [AuthGuard]
    //     canActivate: [CursoGuard]
    // },

    {
        path: 'home',
        component: HomeComponent,
        // canActivate: [AuthGuard]
        canActivate: [CursoGuard]
    },

    /**
     * Caso 1 pathMatch: 'full': 
     * Neste caso, quando o aplicativo é iniciado em localhost: 4200 (ou algum servidor), 
     * a página padrão será a tela de boas-vindas, já que o url será 
     * https: // localhost: 4200 /
     * 
     * Se https: // localhost: 4200 / xxxx, 
     * isso irá redirecionar para a tela pageNotFound devido ao caminho: '**' curinga
     */

    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },

    /**
     * Caso 2 pathMatch: 'prefixo':
     * Se as rotas tiverem {path: '', redirectTo: 'welcome', pathMatch: 'prefix'},
     * Isso nunca alcançará a rota curinga, pois cada url corresponderia ao path: '' definido.
     */

    {
        path: '**',
        component: PaginaNaoEncontradaComponent,
        // canActivate: [CursoGuard] // caso queira redirecionar par ao login ao invés de exibir uma página de not found
    },


];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,
        // { useHash: true }
    )],
    exports: [RouterModule]
})
export class AppRoutingModule { }
