import { LoginComponent } from './views/login/login.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';

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
    {
        path: 'unidades',
        loadChildren: 'src/app/views/unidades/unidades.module#UnidadesModule',
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
