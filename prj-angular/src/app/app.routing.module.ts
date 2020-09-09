import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
