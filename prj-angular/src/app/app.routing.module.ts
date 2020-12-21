import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
    },

    // rota de funcionalidade
    {
        path: 'unidades',
        loadChildren: 'src/app/views/unidades/unidades.module#UnidadesModule',
        canActivate: [AuthGuard]
    },

    {
        path: 'turmas',
        loadChildren: 'src/app/views/turmas/turmas.module#TurmasModule',
        canActivate: [AuthGuard],
        // canActivateChild:[TurmaGuard]
    },

    {
        path: 'alunos',
        loadChildren: 'src/app/views/alunos/alunos.module#AlunosModule',
        canActivate: [AuthGuard],        
    }

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
