/**
 * Angular
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * Ng-Bootstrap
 */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { GridComponent } from './views/unidades/grid/grid.component';
import { TableComponent } from './views/unidades/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UnidadeEditarComponent } from './views/unidades/unidade-editar/unidade-editar.component';

import { ModalFoculsComponent } from './components/modal/modal-foculs/modal-foculs.component';
import { NgbdModalConfirmComponent } from './components/ngbd-modal-confirm/ngbd-modal-confirm.component';



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
    UnlessDirective,
    GridComponent,
    TableComponent,
    UnidadeEditarComponent,
    ModalFoculsComponent,
    NgbdModalConfirmComponent
  ],
  // exports:[GridComponent],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  entryComponents: [ModalFoculsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
