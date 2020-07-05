/**
 * Angular
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
/**
 * Material
 */
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
/**
 * My-App
 */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/**
 * My Components
 */
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
/**
 * My Directives
 */
import { RedDirective } from './directives/red.directive';
import { ForDirective } from './directives/exemplos/for.directive';
import { UnlessDirective } from './directives/exemplos/unless.directive';
/**
 * My Views
 */
import { HomeComponent } from './views/home/home.component';
import { UnidadesComponent } from './views/unidades/unidades.component';
import { CadastroComponent } from './views/unidades/cadastro/cadastro.component';
import { ExemploComponent } from './views/exemplo/exemplo.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    UnidadesComponent,
    CadastroComponent,
    RedDirective,
    ForDirective,
    ExemploComponent,
    UnlessDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
