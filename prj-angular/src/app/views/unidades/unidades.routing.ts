import { UnidadesComponent } from './unidades.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const UNIDADES_ROUTES: Routes = [
    { path: '', component: UnidadesComponent },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(UNIDADES_ROUTES);
