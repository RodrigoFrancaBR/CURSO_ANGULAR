/**
 * Angular
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/**
 * Material
 */
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
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
import { ToastrModule } from 'ngx-toastr';

/**
 * My-App
 */
import { UnidadesModule } from './views/unidades/unidades.module';
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

import { ModalFoculsComponent } from './components/modal/modal-foculs/modal-foculs.component';
import { NgbdModalConfirmComponent } from './components/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { NgbdModalComponent, NgbdModalContent } from './components/modal/modal-component/modal-component';
import { NgbdModalConfig } from './components/modal/modal-config/modal-config';
import { TypeaheadFocusComponent } from './components/typeahead-focus/typeahead-focus.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    TypeaheadFocusComponent,
    NgbdModalContent,
    NgbdModalComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    RedDirective,
    ForDirective,
    UnlessDirective,
    ModalFoculsComponent,
    NgbdModalConfirmComponent,
    NgbdModalConfig,
    AppComponent
  ],
  // exports:[GridComponent],
  imports: [
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
    }),
    // CommonModule,
    BrowserAnimationsModule,
    NgbModule,
    BrowserModule,
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
    MatSortModule,
    UnidadesModule,
    AppRoutingModule
  ],
  providers: [],
  exports: [],
  entryComponents: [NgbdModalContent],
  bootstrap: [AppComponent]
})
export class AppModule { }
